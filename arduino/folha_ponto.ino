#include <LiquidCrystal_I2C.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9

#define LED_R 4
#define LED_G 3
#define LED_B 2
#define BUZZER_PIN 7

MFRC522 rfid(SS_PIN, RST_PIN);

MFRC522::MIFARE_Key key; 

byte nuidPICC[4];

LiquidCrystal_I2C lcd(0x27, 20, 4);

unsigned long lastAccessTime = 0;
const unsigned long accessInterval = 5 * 60 * 1000;

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(4, 0);
  lcd.print("Iniciando");
  lcd.setCursor(4, 1);
  lcd.print("Sistema");
  
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();

  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }

  aproximeCracha();
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial()) return;

  MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
  if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&  
      piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
      piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
    return;
  }

  unsigned long currentTime = millis();
  bool cardIsNew = memcmp(rfid.uid.uidByte, nuidPICC, 4) != 0;
  bool timeElapsed = (currentTime - lastAccessTime >= accessInterval);

  if (cardIsNew || timeElapsed) {
    memcpy(nuidPICC, rfid.uid.uidByte, 4);
    lastAccessTime = currentTime;

    saudacao();
    aproximeCracha();
  } else {
    cartaoRepetido();
    aproximeCracha();
  }

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}

void printHex(const byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    if (buffer[i] < 0x10) Serial.print('0');
    Serial.print(buffer[i], HEX);
    Serial.print(' ');
  }
  Serial.println();
}

void aproximeCracha() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Aproxime seu");
  lcd.setCursor(0, 1);
  lcd.print("cracha do leitor");
  ledControl(LED_B, true);
}

void saudacao() {

  printHex(rfid.uid.uidByte, rfid.uid.size);

  lcd.clear();
  lcd.setCursor(0, 0);
  
  if (nuidPICC[0] == 0x53 && nuidPICC[1] == 0x3A && nuidPICC[2] == 0x21 && nuidPICC[3] == 0x14) {
    lcd.print("Bem-vindo");
    lcd.setCursor(0, 1);
    lcd.print("Matheus Galdino");
  } else if (nuidPICC[0] == 0x43 && nuidPICC[1] == 0xB7 && nuidPICC[2] == 0x42 && nuidPICC[3] == 0x35) {
    lcd.print("Bem-vinda");
    lcd.setCursor(0, 1);
    lcd.print("Myllena Galdino");
  } else {
    lcd.print("Cartão não reconhecido");
  }

  ledControl(LED_G, true); // LED verde aceso
  delay(2000);
  lcd.clear();
}

void cartaoRepetido() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("O ponto ja foi");
  lcd.setCursor(0, 1);
  lcd.print("registrado.");
  ledControl(LED_R, true); // LED vermelho aceso
  delay(2000);
  lcd.clear();
}

void ledControl(int ledColor, bool state) {
  digitalWrite(LED_R, (ledColor == LED_R && state) ? HIGH : LOW);
  digitalWrite(LED_G, (ledColor == LED_G && state) ? HIGH : LOW);
  digitalWrite(LED_B, (ledColor == LED_B && state) ? HIGH : LOW);
  
  if (state) {
    pinMode(BUZZER_PIN, OUTPUT);
    if (ledColor == LED_B) {
      tone(BUZZER_PIN, 1000, 100);
    } else {
      tone(BUZZER_PIN, (ledColor == LED_R) ? 1000 : 800, 100);
      delay(100);
      tone(BUZZER_PIN, (ledColor == LED_R) ? 800 : 1000, 100);
      delay(200);
    }
    delay(100);
    noTone(BUZZER_PIN);
  }
}

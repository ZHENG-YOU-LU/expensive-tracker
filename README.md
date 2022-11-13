# 消費紀錄簿

使用Node.js + Express套件打造出的記帳本，使用者可以註冊帳號登入，或以 Facebook 認證登入使用。
可新增一筆新的資料、編輯修改每一筆詳細資料和刪除功能。

## 使用者驗證

- 使用者可以註冊帳號登入。
- 或以 Facebook 第三方認證登入使用。

## 功能列表

- 使用者可以在首頁看到所有消費的簡單資料：

- 使用者可以新增資料

- 使用者可以透過編輯修改資料

- 使用者可以透過刪除功能刪除

## 畫面預覽

![index](/image/1.jpg)

![index2](/image/2.jpg)

![show](/image/3.jpg)

## 安裝
1. 複製專案，在終端機輸入：
```
git clone https://github.com/ZHENG-YOU-LU/Expense-Tracker
```
2. 進入專案資料夾，在終端機輸入：
```
cd Expense-Tracker
```
3. 安裝`npm`套件。在終端機輸入：
```
npm init -y
```
4. 設定env變數 請參考.env.example檔案設定FB、Mongoose環境變數，並將檔名改為.env
```
FACEBOOK_ID=SKIP
FACEBOOK_SECRET=SKIP
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
SESSION_SECRET=ThisIsMySecret
EXPENSE_URI=mongodb+srv://您的帳號:您的密碼@cluster0.euvhff2.mongodb.net/expense-tracker?retryWrites=true&w=majority
PORT=3000
```
5. 建立種子資料，在終端機輸入:
```
npm run seed
```
6. 執行專案。在終端機輸入：
```
npm run dev
```
7. 於瀏覽器網址列輸入：
```
localhost:3000
```
8. 可使用種子數據中的測試帳戶登錄
```
email: user1@example.com
password: 12345678
```

## 使用工具

- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [Node.js](https://www.casper.tw/development/2022/01/10/install-nvm/) - 執行環境
- [Sourcetree](https://www.sourcetreeapp.com/) - git 的 GUI 管理軟體

- [Mongodb](https://account.mongodb.com/) - 文件資料庫
- [Mongoose](https://mongoosejs.com/) - 操作 MongoDB 的 ODM
- [Robo 3T](https://blog.robomongo.org/studio3t-free/) - 查看資料庫圖形介面

- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) - 網頁模板套件
- [Express](https://www.npmjs.com/package/express) - 應用程式架構
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) --處理密碼雜湊
- [Express-Session](https://www.npmjs.com/package/express-session/v/1.17.1) - 儲存認證結果
- [Connect-flash](https://www.npmjs.com/package/connect-flash) - 建立快閃訊息
- [Dotenv](https://www.npmjs.com/package/dotenv) - 讀取 .env 檔
- [Method-override](https://www.npmjs.com/package/method-override) - Express 的 middleware(中介軟體)
- [Passport](https://www.npmjs.com/package/passport) - 認證使用者
- [passport-facebook](http://www.passportjs.org/packages/passport-facebook/) - 認證facebook使用者
- [passport-local](http://www.passportjs.org/packages/passport-local/) - 認證local使用者


## 開發者

- [ZHENG-YOU-LU](https://github.com/ZHENG-YOU-LU)
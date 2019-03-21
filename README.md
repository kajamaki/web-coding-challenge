# Web Coding Challenge
Shops nearby
  
## Built With

  - [Laravel](https://laravel.com/)
  - [Angular](http://breakdance.io)
  - [Google places API](https://developers.google.com/places/web-service/intro)

## Installing
Clone repository.

```sh
$ https://github.com/kajamaki/web-coding-challenge.git
```
### Back end set up

```sh
$ cd web-coding-challenge/back-end/
$ composer install
$ cp .env.example .env
$ php artisan key:generate
```

Open .env file in your favorite text editor, and set your database connection

```sh
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```

- Get [Google Places API Key](https://developers.google.com/places/web-service/get-api-key). otherwise you can use the key i've provided with the e-mail.
- Add Key to .env file

```sh
GOOGLE_PLACES_KEY=[copy and past API Key here]
```
- Run database migration
 ```sh
$ php artisan migrate
```
Next, you should run the passport:install command. This command will create the encryption keys needed to generate secure access tokens
 ```sh
$ php artisan passport:install
```

Typically, you may use a web server such as Apache or Nginx to serve your Laravel applications. If you are on PHP 5.4+ and would like to use PHP's built-in development server, you may use the  serve Artisan command:

 ```sh
$ php artisan serve
```

### Front end set up
Open a new terminal in the front end folder "web-coding-challenge/front-end"

```sh
$ npm install
$ ng serve
```
By default the app will be running [http://localhost:4200](http://localhost:4200)


# Music Player App

## Описание
Music Player App — это современное приложение c удобным интерфейсом для управления музыкальной библиотекой и воспроизведения треков.

## Функционал приложения

### Главные возможности
- **Просмотр треков**:
  - Отображение списка треков с информацией о названии, исполнителе, альбоме, годе выпуска и длительности.

- **Фильтрация**:
  - Возможность фильтровать треки по:
    - Исполнителю
    - Жанру
    - Году выпуска

- **Поиск**:
  - Быстрый поиск треков по их названию через строку поиска.

- **Сортировка**:
  - Сортировка треков по году выпуска в порядке возрастания или убывания.

- **Добавление в избранное**:
  - Управление списком избранных треков с сохранением этих данных в учетной записи пользователя.

- **Просмотр подборок**:
  - Доступ к плейлистам и различным музыкальным подборкам.

- **Управление воспроизведением**:
  - Включение/пауза трека
  - Переключение треков
  - Режим случайного воспроизведения (shuffle)
  - Режим зацикливания (loop)

- **Регулировка громкости**:
  - Управление уровнем громкости воспроизведения.

- **Поддержка авторизации**:
  - Возможность добавления треков в избранное доступна только авторизованным пользователям.

- **Управление сеансом пользователя**:
  - Вход
  - Выход
  - Хранение токенов доступа

## Используемые технологии
- **Frontend**:
  - React: библиотека для построения пользовательского интерфейса.
  - Redux Toolkit: управление состоянием приложения.
  - React Router: маршрутизация между страницами.
  - TypeScript: статическая типизация для повышения стабильности и предсказуемости кода.
  - CSS Modules: стилизация компонентов.

## Установка и запуск

### Локальная установка
1. Убедитесь, что у вас установлен Node.js версии 14+.
2. Склонируйте репозиторий и перейдите в директорию проекта:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```
3. Установите зависимости:
   ```bash
   npm install
   ```
4. Запустите приложение:
   ```bash
   npm run dev
   ```

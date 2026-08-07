# Playwright practice

## Установка

npm install
npx playwright install

## Запуск

npx playwright test

## Шпаргалка по командам Playwright

Все команды выполняются из корня проекта.

### Запуск тестов

```powershell
# Запустить все тесты
npx playwright test

# Запустить один файл
npx playwright test tests/locators-week3.spec.ts

# Запустить несколько файлов
npx playwright test tests/todo-week1.spec.ts tests/todo-week2.spec.ts

# Запустить тест, находящийся на конкретной строке
npx playwright test tests/locators-week3.spec.ts:10

# Запустить тест по названию или части названия
npx playwright test --grep "Dynamic ID"
npx playwright test -g "Dynamic ID"

# Запустить тест по названию только в конкретном файле
npx playwright test tests/locators-week3.spec.ts -g "Dynamic ID"

# Не запускать тесты, название которых подходит под выражение
npx playwright test --grep-invert "flaky|slow"

# Показать список найденных тестов без запуска
npx playwright test --list

# Запустить только тесты, упавшие в предыдущем запуске
npx playwright test --last-failed

# Запустить только изменённые тестовые файлы относительно Git
npx playwright test --only-changed

# Запустить изменённые тесты относительно указанной ветки
npx playwright test --only-changed main
```

Фильтр `--grep` проверяет название целиком, включая `test.describe`. Можно использовать
регулярные выражения, например `"login|checkout"`.

### Браузер и режим отображения

```powershell
# Запустить в видимом браузере
npx playwright test --headed

# Запустить только в Chromium
npx playwright test --project=chromium

# Запустить в нескольких настроенных projects
npx playwright test --project=chromium --project=firefox
```

В текущем `playwright.config.ts` активен только project `chromium`. Чтобы использовать
`--project=firefox` или `--project=webkit`, сначала раскомментируйте соответствующие
projects в конфигурации и установите браузеры.

Флаг `--browser` не используется в этом проекте: Playwright не разрешает сочетать его
с конфигурацией, в которой определены `projects`. Выбирайте браузер через `--project`.

### UI Mode, Inspector и отладка

```powershell
# Открыть интерактивный UI Mode
npx playwright test --ui

# Открыть UI Mode сразу для конкретного файла
npx playwright test tests/locators-week3.spec.ts --ui

# Запустить Inspector: headed, один worker и без test timeout
npx playwright test --debug

# Отлаживать конкретный файл
npx playwright test tests/locators-week3.spec.ts --debug

# Отлаживать конкретный тест
npx playwright test tests/locators-week3.spec.ts -g "Dynamic ID" --debug
```

В UI Mode можно выбирать отдельные тесты, смотреть шаги, DOM snapshot, network,
console и повторно запускать упавшие сценарии.

### Повторы, retries и стабильность

```powershell
# Запустить каждый тест пять раз
npx playwright test --repeat-each=5

# Пять раз запустить только файл третьей недели
npx playwright test tests/locators-week3.spec.ts --repeat-each=5

# Повторять упавший тест до двух раз
npx playwright test --retries=2

# Считать flaky-тесты ошибкой запуска
npx playwright test --retries=2 --fail-on-flaky-tests

# Остановиться после первого падения
npx playwright test -x

# Остановиться после трёх падений
npx playwright test --max-failures=3

# Изменить timeout одного теста для всего запуска
npx playwright test --timeout=60000

# Ограничить время выполнения всего набора
npx playwright test --global-timeout=300000
```

`repeat-each` проверяет стабильность даже успешно проходящих тестов. `retries`
повторяет только упавшие тесты и не исправляет причину flaky-поведения.

### Параллельное выполнение

```powershell
# Выполнять тесты последовательно
npx playwright test --workers=1

# Использовать четыре worker-процесса
npx playwright test --workers=4

# Использовать половину доступных CPU
npx playwright test --workers=50%

# Разрешить параллельное выполнение всех тестов
npx playwright test --fully-parallel

# Запустить первую половину набора (например, в первом CI job)
npx playwright test --shard=1/2

# Запустить вторую половину набора
npx playwright test --shard=2/2
```

### Reports, trace и артефакты

```powershell
# Использовать HTML reporter
npx playwright test --reporter=html

# Использовать компактный line reporter
npx playwright test --reporter=line

# Использовать несколько reporters
npx playwright test --reporter=line,html

# Открыть последний HTML-отчёт
npx playwright show-report

# Открыть отчёт из указанной директории
npx playwright show-report playwright-report

# Сохранять trace для каждого теста
npx playwright test --trace=on

# Сохранять trace только при падении
npx playwright test --trace=retain-on-failure

# Сохранять trace на первом retry
npx playwright test --retries=1 --trace=on-first-retry

# Открыть конкретный trace-файл
npx playwright show-trace test-results/<папка-теста>/trace.zip

# Изменить папку для test results, trace и screenshots
npx playwright test --output=test-results-local
```

### Snapshots

```powershell
# Обновить изменившиеся snapshots
npx playwright test --update-snapshots

# Перезаписать все snapshots
npx playwright test --update-snapshots=all

# Не выполнять snapshot-проверки
npx playwright test --ignore-snapshots
```

### Установка браузеров

```powershell
# Установить браузеры, необходимые Playwright
npx playwright install

# Установить конкретные браузеры
npx playwright install chromium
npx playwright install chromium firefox webkit

# Показать установленные браузеры
npx playwright install --list

# Показать, что будет установлено, без скачивания
npx playwright install --dry-run

# Установить браузеры вместе с системными зависимостями (обычно Linux/CI)
npx playwright install --with-deps
```

### Codegen

```powershell
# Открыть Codegen для сайта
npx playwright codegen https://demo.playwright.dev/todomvc/

# Сгенерировать действия для UI Testing Playground
npx playwright codegen https://uitestingplayground.com/

# Эмулировать устройство во время записи
npx playwright codegen --device="iPhone 13" https://example.com

# Сохранить авторизованное состояние после записи
npx playwright codegen --save-storage=auth.json https://example.com

# Запустить Codegen с ранее сохранённым состоянием
npx playwright codegen --load-storage=auth.json https://example.com
```

Не добавляйте `auth.json` с cookies или токенами в Git.

### Полезные комбинации

```powershell
# Один тест, в видимом Chromium, пять раз подряд
npx playwright test tests/locators-week3.spec.ts -g "Dynamic ID" --project=chromium --headed --repeat-each=5

# Последовательный debug-запуск файла
npx playwright test tests/locators-week3.spec.ts --debug --workers=1

# Быстрый локальный прогон с компактным выводом
npx playwright test --project=chromium --reporter=line

# Проверка стабильности с trace при первом падении/retry
npx playwright test --repeat-each=5 --retries=1 --trace=on-first-retry

# Посмотреть справку установленной версии Playwright
npx playwright test --help
npx playwright --help
```

## UI Mode

npx playwright test --ui

## Отчёт

npx playwright show-report

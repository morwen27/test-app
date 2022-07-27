export enum ResponseStatus {
    'Запрос выполнен успешно' = 200,
    'Неверный запрос' = 400,
    'Запрашиваемые данные не найдены' = 404,
    'Сервер не доступен' = 500,
}

export enum ResponseSelectors {
    'success' = 1,
    'error' = 2,
}

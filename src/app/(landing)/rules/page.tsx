

export default function RulesPage() {

    return (
        <div className="flex flex-col items-center justify-center gap-y-2">
            <h1>Наши правила</h1>

            <div className="flex flex-col items-center justify-center gap-y-1">
                <h1>Требования к публикуемым работам</h1>

                <ol>
                    <li>Арт или коллекция должны иметь название</li>
                    <li>Работа должна относиться к одной из доступных категорий</li>
                    <li>Изображение должно быть хорошего качества</li>
                    <li>Описание работы должно быть полным и описывать суть работы</li>
                </ol>
            </div>

            <div className="flex flex-col items-center justify-center gap-y-1">
                <h1>Запрещено</h1>

                <ol>
                    <li>Материалы нарушающие законодательство РФ</li>
                    <li>Материалы, призывающие к насилию</li>
                    <li>Материалы, содержащие оскорбление или нарушение прав человека</li>
                    <li>Материалы, порнографического характера</li>
                    <li>Материалы, чрезмерного насилия</li>
                </ol>
            </div>
        </div>
    )
}
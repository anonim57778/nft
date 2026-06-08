

export default function RulesPage() {

    return (
        <div className="p-8 min-h-screen">      
            <div className="bg-primary h-full rounded-3xl">
                <h1 className="text-white text-center py-4 text-2xl lg:text-4xl">Наши правила</h1>

                <div className="flex flex-col gap-y-5 py-6 px-6">
                    <div className="flex flex-col justify-start gap-y-2">
                        <h1 className="text-center lg:text-start text-xl lg:text-3xl">Требования к публикуемым работам</h1>

                        <div className="flex flex-col gap-y-1">
                            <p>1. Арт или коллекция должны иметь название;</p>
                            <p>2. Работа должна относиться к одной из доступных категорий;</p>
                            <p>3. Изображение должно быть хорошего качества;</p>
                            <p>4. Описание работы должно быть полным и описывать суть работы.</p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-start gap-y-2">
                        <h1 className="text-center lg:text-start text-xl lg:text-3xl">Запрещено</h1>

                        <div className="flex flex-col gap-y-1">
                            <p>1. Материалы нарушающие законодательство РФ;</p>
                            <p>2. Материалы, призывающие к насилию;</p>
                            <p>3. Материалы, содержащие оскорбление или нарушение прав человека;</p>
                            <p>4. Материалы, порнографического характера;</p>
                            <p>5. Материалы, чрезмерного насилия.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
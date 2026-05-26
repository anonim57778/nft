"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "~/components/ui/tabs";
import { type Collection } from "~/lib/shared/types/collection";
import { type Art } from "~/lib/shared/types/art";
import CardArt from "../art-card";
import CardCollection from "../collection-card";
import { cn } from "~/lib/utils";


export default function ListMarketplace({
    arts,
    collections
} : {
    arts: Art[],
    collections: Collection[]
}) {

    const [state, setState] = useState("art");
    
    return (
        <Tabs value={state} onValueChange={setState}>
            <TabsList>
                <TabsTrigger value="art">Арты</TabsTrigger>
                <TabsTrigger value="collection">Коллекции</TabsTrigger>
            </TabsList>

            <div className="bg-card py-10 lg:py-[60px]">
                <div className="container">
                    <TabsContent value="art" className={cn("gap-[30px]", arts.length === 0 ? "" : "grid grid-cols-1 lg:grid-cols-4")}>
                        {arts.length > 0 ? (
                            arts.map((item, index) => (
                                <CardArt key={index} item={item} index={index} className="bg-background"/>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-5 text-center">
                                <h1 className="text-2xl font-bold">Пока нет артов</h1>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="collection" className={cn("gap-[30px]", collections.length === 0 ? "" : "grid grid-cols-1 lg:grid-cols-4")}>
                        {collections.length > 0 ? (
                            collections.map((item, index) => (
                                <CardCollection key={index} item={item}/>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-5 text-center">
                                <h1 className="text-2xl font-bold">Пока нет коллекций</h1>
                            </div>
                        )}
                    </TabsContent>
                </div>
            </div>
        </Tabs>
    )
}
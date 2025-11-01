"use client";
import { useState } from "react";
import { type Art } from "~/lib/shared/types/art";
import { type Collection } from "~/lib/shared/types/collection";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "~/components/ui/tabs";
import CardArt from "../../art-card";
import CardCollection from "../../collection-card";


export default function AuthorList({
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
                    <TabsContent value="art" className="grid grid-cols-1 lg:grid-cols-4 gap-[30px]">
                        {arts.map((item, index) => (
                            <CardArt key={index} item={item} index={index} className="bg-background"/>
                        ))}
                    </TabsContent>

                    <TabsContent value="collection" className="grid grid-cols-1 lg:grid-cols-4 gap-[30px]">
                        {collections.map((item, index) => (
                            <CardCollection key={index} item={item}/>
                        ))}
                    </TabsContent>
                </div>
            </div>
        </Tabs>
    )
}
"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "~/components/ui/tabs";
import { type Collection } from "~/lib/shared/types/collection";
import { type Art } from "~/lib/shared/types/art";
import CardArt from "~/app/(landing)/art-card";
import CardCollection from "~/app/(landing)/collection-card";
import MakePublishArt from "../make-publich-art";
import MakePublishCollection from "../make-publish-collection";


export default function ListArtsCollectionsIsPublished({
    arts,
    collections
} : {
    arts: Art[],
    collections: Collection[]
}) {

    const [state, setState] = useState("art");
    
    return (
        <Tabs value={state} onValueChange={setState} className="h-full flex flex-col grow bg-card rounded-2xl overflow-hidden">
            <div>
                <TabsList>
                    <TabsTrigger value="art">Арты</TabsTrigger>
                    <TabsTrigger value="collection">Коллекции</TabsTrigger>
                </TabsList>
            </div>
            <div className="bg-card w-full overflow-auto grow">
                <div className="container h-full">
                    <TabsContent value="art" className="h-full">
                        {arts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-[30px] py-5">
                                {arts.map((item, index) => (
                                    <MakePublishArt key={index} art={item} index={index} className="bg-background"/>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <h1 className="text-white text-3xl text-center">У вас пока нет личных артов</h1>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="collection" className="h-full">
                        {collections.length > 0 ? (
                            <div className="grid grid-cols-1 gap-[30px] py-5">
                                {collections.map((item, index) => (
                                    <MakePublishCollection key={index} collection={item} index={index} className="bg-background"/>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <h1 className="text-white text-3xl text-center">У вас пока нет личных коллекций</h1>
                            </div>
                        )}
                    </TabsContent>
                </div>
            </div>
        </Tabs>
    )
}
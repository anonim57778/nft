import ProfileSidebar from "./sidebar";


export default function ProfileLayout({
    children
} : Readonly<{ children: React.ReactNode }>) {

    return (
        <main className="flex lg:gap-6 h-screen lg:py-6 lg:pl-6">
            <ProfileSidebar/>
            <div className="grow overflow-auto bg-primary lg:rounded-l-3xl">
                {children}
            </div>
        </main>
    )
}
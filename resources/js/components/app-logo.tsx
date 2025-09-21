export default function AppLogo() {
    return (
        <>
            <div className="flex size-10 items-center justify-center text-sidebar-primary-foreground">
                <img src="/logo1.png" className="rounded-sm" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">Preparação de carros</span>
            </div>
        </>
    );
}

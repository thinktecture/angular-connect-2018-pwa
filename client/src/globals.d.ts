interface Navigator {
    share(obj: any): Promise<void>;
}

interface BeforeInstallPromptEvent extends Event {
    prompt(): void
}

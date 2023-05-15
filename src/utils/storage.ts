export interface LocalStorage {
    toggle?: string
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredToggle(toggle : string) : Promise<void> {
    const vals: LocalStorage = {
        toggle,
    }

    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve()
        })
    })
}

export function getStoredToggle() : Promise<string> {
    const keys: LocalStorageKeys[] =  ['toggle']
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res: LocalStorage) => {
            resolve(res.toggle ?? 'Enable');
        })
    })

}
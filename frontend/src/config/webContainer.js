import { WebContainer } from '@webcontainer/api';

// // Call only once
// const webcontainerInstance = await WebContainer.boot();

let webcontainerInstance = null;

export const getWebContainer = async () => {
    if(webcontainerInstance == null){
        webcontainerInstance = await WebContainer.boot();
    }
    return webcontainerInstance;
}
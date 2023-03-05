import Data from '../../../types/data-types';
// import { Link } from './loader-window';

async function loader(link: string): Promise<IDataWrapper | undefined> {
    try {
        const url: string = link;
        const response: Response = await fetch(url);
        const data: Promise<IDataWrapper> = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

// const promise = new Promise((resolve, reject) => {
//     fetch(Link.loadLink)
//     .then((response) => {
//         if(response.status !== 200 || promise.state === 'pending')
//     })
// })

interface IDataWrapper {
    products: Data;
}

export default loader;

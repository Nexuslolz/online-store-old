interface IData {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    discountPercentage: number;
    rating: number;
    key?: string;
    [index: string]: string | number | string[] | undefined;
}

type Data = Array<IData>;

export default Data;

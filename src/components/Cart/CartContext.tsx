import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { getCartItemsFromStorage, setCartItemsToStorage } from './cartModel';

export interface CartItem {
    readonly id: string;
    readonly price: number;
    readonly title: string;
    readonly count: number;
}
export interface CartState {
    items: readonly CartItem[];
    addItemToCart: (item: CartItem) => void;
    removeItemFromCart: (id: CartItem['id']) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    useEffect(() => {
        setCartItems(getCartItemsFromStorage());
    }, [])

    useEffect(() => {
        console.log(cartItems)
        if (cartItems.length !== 0) {
            setCartItemsToStorage(cartItems)
        }
    }, [cartItems])

    return <CartStateContext.Provider value={{
        items: cartItems,
        addItemToCart: (item) => {
            setCartItems((prevState) => {
                const existingItem = prevState.find((existingItem) => existingItem.id === item.id);
                if (!existingItem) {
                    return [...prevState, item];
                }
                return prevState.map(existingItem => {
                    if (existingItem.id === item.id) {
                        return {
                            ...existingItem,
                            count: existingItem.count + 1,
                        };
                    }
                    return existingItem;
                })
            })
        },
        removeItemFromCart: (id) => {
            setCartItems((prevState) => {
                const existingItem = prevState.find((el) => el.id === id);

                if (existingItem && existingItem.count <= 1) {
                    return prevState.filter((el) => el.id !== id);
                }
                return prevState.map(el => {
                    if (el.id === id) {
                        return {
                            ...el,
                            count: el.count - 1,
                        };
                    }
                    return el;
                })
            })
        }
    }}
    >{children}</CartStateContext.Provider>
}

export const useCartState = () => {
    const cartState = useContext(CartStateContext)
    if (!cartState) {
        throw new Error('You forgot CartStateContextProvider')
    }
    return cartState;
}
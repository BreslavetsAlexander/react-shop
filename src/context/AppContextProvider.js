import React from 'react';
import { LOCAL_STORAGE, ROLES } from '@constants';
import { appContext } from './context';

export class AppContextProvider extends React.Component {
  state = {
    cart: [],
    user: {
      role: ROLES.GUEST,
    },
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CART));
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER));

    if (cart) {
      this.setState({ cart });
    }

    if (user) {
      this.setState({ user });
    }
  }

  componentDidUpdate() {
    const cartFromLocalStorage = localStorage.getItem(LOCAL_STORAGE.CART);
    const userFromLocalStorage = localStorage.getItem(LOCAL_STORAGE.USER);

    if (JSON.stringify(this.state.cart) !== cartFromLocalStorage) {
      this.saveInLocalStorage(LOCAL_STORAGE.CART, this.state.cart);
    }

    if (JSON.stringify(this.state.user) !== userFromLocalStorage) {
      this.saveInLocalStorage(LOCAL_STORAGE.USER, this.state.user);
    }
  }

  addToCart = phone => {
    const phoneIndexInCart = this.phoneIndexInCart(phone);

    if (phoneIndexInCart !== -1) {
      this.changeCount(phone, 1);
    } else {
      const cart = [...this.state.cart];
      cart.push({ ...phone, count: 1 });
      this.setState({ cart });
    }
  };

  removeFromCart = phone => {
    const cart = [...this.state.cart];
    const phoneIndexInCart = this.phoneIndexInCart(phone);
    cart.splice(phoneIndexInCart, 1);
    this.setState({ cart });
  };

  phoneIndexInCart = phone => {
    return this.state.cart.findIndex(item => item.id === phone.id);
  };

  changeCount = (phone, a) => {
    const cart = [...this.state.cart];
    const phoneIndexInCart = this.phoneIndexInCart(phone);
    cart[phoneIndexInCart].count += a;

    if (cart[phoneIndexInCart].count < 1) {
      this.removeFromCart(phone);
    } else {
      this.setState({ cart });
    }
  };

  get orderAmount() {
    const delivery = 500;
    const sum = this.state.cart.reduce((accumulator, item) => {
      return accumulator + item.count * item.price;
    }, 0);

    if (sum > 9999) {
      return {
        sum,
        delivery: 0,
        total: sum,
      };
    }

    return {
      sum,
      delivery,
      total: sum + delivery,
    };
  }

  clearCart = () => {
    this.setState({ cart: [] });
  };

  setUser = user => {
    if (user === null) {
      this.setState({
        user: {
          role: ROLES.GUEST,
        },
      });

      return;
    }

    this.setState({ user });
  };

  saveInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  render() {
    return (
      <appContext.Provider
        value={{
          cart: this.state.cart,
          addToCart: this.addToCart,
          removeFromCart: this.removeFromCart,
          phoneIndexInCart: this.phoneIndexInCart,
          changeCount: this.changeCount,
          orderAmount: this.orderAmount,
          clearCart: this.clearCart,
          user: this.state.user,
          setUser: this.setUser,
        }}>
        {this.props.children}
      </appContext.Provider>
    );
  }
}

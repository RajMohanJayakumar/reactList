import React from 'react';
import { initialEntries } from './utils';
import ItemsTable from './components/Table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: initialEntries(),
    }
  }

  deleteEntries = (itemIds) => {
    this.setState({
      itemsList: this.state.itemsList.filter((item) => !itemIds.includes(item.id))
    });
  }

  resetEntries = () => {
    this.setState({
      itemsList: initialEntries(),
    });
  }

  updatePrice = (itemId, udpatedPrice) => {
    this.setState({
      itemsList: this.state.itemsList.map((item) => {
        if(item.id === itemId) {
          item.price = udpatedPrice;
        }
        return item
      })
    })
  }

  render() {
    return (
      <div>
        <ItemsTable itemsList={this.state.itemsList} deleteEntries={this.deleteEntries} resetEntries={this.resetEntries} updatePrice={this.updatePrice} />
      </div>
    )
  }
  
}

export default App;

'use strict';

//https://fcctop100.herokuapp.com/api/fccusers/top/recent
//https://fcctop100.herokuapp.com/api/fccusers/top/alltime
// var cols = [{key: 'username', label: 'Username'}, {key: 'recent', label: 'Recent Score'}, {key: 'overall', label: 'Overall Score'}];

var TopList = React.createClass({
  displayName: 'TopList',

  getInitialState: function getInitialState() {
    return { winner: [] };
  },

  componentDidMount: function componentDidMount() {
    var url = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    this.update(url);
  },

  handleChange: function handleChange() {
    // var self = this;
    var url = this.state.winner[100].url;
    console.log(url);
    var nurl = '';
    if (url === "https://fcctop100.herokuapp.com/api/fccusers/top/alltime") {
      nurl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    } else {
      nurl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
    }

    this.update(nurl);
  },

  //componentWillReceiveProps: function(url){
  update: function update(url) {
    //console.log('hi');
    var self = this;
    $.getJSON(url, function (result) {
      //array of objects
      var user = result.map(function (p) {
        return {
          username: p["username"],
          img: p["img"],
          recent: p["recent"],
          alltime: p["alltime"]
        };
      });
      user.push({ url: url });

      $(self.getDOMNode()).fadeOut(700, function () {
        self.setState({ winner: user });
        $(self.getDOMNode()).fadeIn(700);
      });
    });
  },

  render: function render() {
    console.log("hi");
    //console.log(this.state.winner[100].url);
    return React.createElement(
      'div',
      null,
      React.createElement(Button, { onClick: this.handleChange, text: this.state.winner }),
      React.createElement(Table, { user: this.state.winner })
    );
  }
});

var Button = React.createClass({
  displayName: 'Button',

  newtext: function newtext(y) {
    //y = y.toString()
    return y.map(function (t) {
      if (t.url === "https://fcctop100.herokuapp.com/api/fccusers/top/alltime") {
        return "Get Top Scores From Last 30 Days";
      }
      if (t.url === 'https://fcctop100.herokuapp.com/api/fccusers/top/recent') {
        return "Get All-Time Top Scores";
      }
    });
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'text-center' },
      React.createElement(
        'button',
        { onClick: this.props.onClick },
        this.newtext(this.props.text)
      )
    );
  }
});

var Table = React.createClass({
  displayName: 'Table',

  generateRows: function generateRows(x) {
    //var cols = this.props.cols;
    //var data = ;
    var count = 0;
    return x.map(function (item) {
      // var cells = cols.map(function(colData){
      //   return<td id={colData.key}>{item[colData.key]}</td>
      // });
      // return <tr>{cells}</tr>;
      count++;
      if (count < 101) {
        return React.createElement(
          'tr',
          { key: item.username },
          React.createElement(
            'td',
            null,
            React.createElement(
              'b',
              null,
              count
            )
          ),
          React.createElement(
            'td',
            null,
            React.createElement('img', { src: item.img }),
            item.username
          ),
          React.createElement(
            'td',
            null,
            item.recent
          ),
          React.createElement(
            'td',
            null,
            item.alltime
          )
        );
      }
    });
  },

  render: function render() {
    var goodStuff = React.createElement(
      'div',
      null,
      React.createElement(
        'table',
        null,
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              null,
              'Ranking'
            ),
            React.createElement(
              'th',
              null,
              'Username'
            ),
            React.createElement(
              'th',
              null,
              'Recent'
            ),
            React.createElement(
              'th',
              null,
              'AllTime'
            )
          )
        ),
        React.createElement(
          'tbody',
          null,
          this.generateRows(this.props.user)
        )
      )
    );
    //console.log(goodStuff);   
    return goodStuff;
  }
});

// var HelloWorld = React.createClass({
//     render: function() {
//         return <div>Hello, world!</div>;
//     }
// });

// ReactDOM.render(<HelloWorld />,document.getElementById('container'));

ReactDOM.render(React.createElement(TopList, null), document.getElementById('container'));
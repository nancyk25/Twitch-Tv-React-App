"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CLIENT_ID = "qz6d62kpplo4bq9c23wkfz4sp91bjr";
var TWITCH_LOGO = "http://static1.squarespace.com/static/510d16d5e4b0e3b888b8ec28/t/560f9916e4b0827aaefe9bd1/1443862807121/Twitch_Logo_Black.png";
var TWITCH_API = "https://api.twitch.tv/kraken";
var CHANNELS = ["freecodecamp", "GfinityTV", "veemerk", "iijeriichoii", "SethBling", "Xisuma", "OMGitsfirefoxx", "thatmumbojumbo", "ethotv", "captainsparklez", "syndicate", "ramettacraft", "brunofin", "comster404", "twitchoffice", "FRCGameSense", "WePlayDota2"];

var Twitch = function (_React$Component) {
  _inherits(Twitch, _React$Component);

  function Twitch() {
    _classCallCheck(this, Twitch);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      input: "",
      channels: [],
      default: []
    };
    //map through array of channels and send fetch request for each
    CHANNELS.map(function (channel) {
      return _this.fetchChannel(channel);
    });

    _this.filterOnline = _this.filterOnline.bind(_this);
    _this.filterOffline = _this.filterOffline.bind(_this);
    _this.filterAll = _this.filterAll.bind(_this);
    _this.fetchChannel = _this.fetchChannel.bind(_this);
    _this.deleteCard = _this.deleteCard.bind(_this);
    return _this;
  }

  //FETCH method
  //Grabbing the input and setting up channels here...

  Twitch.prototype.fetchChannel = function fetchChannel() {
    var _this2 = this;

    var channel = arguments.length <= 0 || arguments[0] === undefined ? this.state.input : arguments[0];

    this.setState({ input: "" });
    var url = TWITCH_API + "/channels/" + channel + "?client_id=" + CLIENT_ID;
    fetch(url).then(function (res) {
      return res.json();
    }).then(function (resJson) {
      _this2.setState({
        channels: _this2.state.channels.concat(resJson),
        default: _this2.state.channels.concat(resJson)
      });
    }).catch(console.log);
  };

  Twitch.prototype.isErr = function isErr(status) {
    return status == 404 || status == 422;
    // return true if there is an error
    // false if there isn't'
  };

  Twitch.prototype.filterOnline = function filterOnline(e) {
    var _this3 = this;

    e.preventDefault();
    var channels = this.state.default;
    var filtered = channels.filter(function (c) {
      return _this3.isErr(c.status) ? null : c;
    });
    console.log('online', filtered);
    this.setState({
      channels: filtered
    });
  };

  Twitch.prototype.filterOffline = function filterOffline(e) {
    var _this4 = this;

    e.preventDefault();
    var channels = this.state.default;
    var offlineChannels = channels.filter(function (c) {
      return _this4.isErr(c.status) && c;
    });
    console.log(offlineChannels);
    this.setState({
      channels: offlineChannels
    });
  };

  Twitch.prototype.filterAll = function filterAll() {
    console.log('all');
    var all = this.state.default;
    this.setState({
      channels: all
    });
  };

  Twitch.prototype.deleteCard = function deleteCard(e) {
    e.preventDefault();
    var deleteId = parseInt(e.currentTarget.value);
    var channels = this.state.channels;
    var newArray = channels.filter(function (c) {
      if (c._id === undefined) {
        return false;
      } else {
        // if channel id matches delete id then filter it
        // out by returning null/false if not just return c
        return c._id === deleteId ? false : c;
      }
    });

    this.setState({
      channels: newArray
    });
  };

  Twitch.prototype.render = function render() {
    var _this5 = this;

    return React.createElement(
      Container,
      null,
      React.createElement(Logo, { logo: TWITCH_LOGO }),
      React.createElement(InputChannel, {
        input: this.state.input,
        inputChange: function inputChange(input) {
          return setState({ input: input });
        } // set new state of input
        , addChannel: function addChannel(e) {
          return _this5.fetchChannel();
        } //add channel to array
      }),
      React.createElement(ChannelTypes, {
        online: this.filterOnline,
        offline: this.filterOffline,
        all: this.filterAll
      }),
      React.createElement(ChannelList, {
        channels: this.state.channels,
        deleteCard: this.deleteCard
      })
    );
  };

  return Twitch;
}(React.Component);
//Presentational components

var Container = function Container(props) {
  return React.createElement(
    "div",
    { className: "container" },
    props.children
  );
};

var Logo = function Logo(props) {

  return React.createElement(
    "div",
    { className: "row" },
    React.createElement(
      "div",
      { className: "col-xs-8 col-xs-push-2" },
      React.createElement("img", { src: props.logo, className: "img-responsive center-block page-logo" })
    )
  );
};

//Input new channel here
var InputChannel = function InputChannel(props) {
  return React.createElement(
    "div",
    { className: "row" },
    React.createElement(
      "div",
      { className: "col-xs-12 col-md-8 col-md-push-2" },
      React.createElement(
        "div",
        { className: "input-group search-bar" },
        React.createElement("input", { type: "text", className: "form-control", placeholder: "Add channel here...",
          value: props.input //dump input props as new value
          , onChange: function onChange(e) {
            return props.inputChange(e.target.value);
          } //handle the new input
        }),
        React.createElement(
          "span",
          { className: "input-group-btn" },
          React.createElement(
            "button",
            { className: "btn btn-default", type: "button",
              onClick: function onClick(e) {
                return props.addChannel();
              } },
            "Add!"
          )
        )
      )
    )
  );
};

//Online/Offline buttons

var ChannelTypes = function ChannelTypes(_ref) {
  var online = _ref.online;
  var offline = _ref.offline;
  var all = _ref.all;

  return React.createElement(
    "div",
    { className: "btn-group status-buttons" },
    React.createElement(
      "button",
      { className: "btn btn-default", type: "button",
        onClick: online },
      " Online "
    ),
    React.createElement(
      "button",
      { className: "btn btn-default",
        type: "button",
        onClick: offline },
      " Offline "
    ),
    React.createElement(
      "button",
      { className: "btn btn-default",
        type: "button",
        onClick: all },
      " All "
    )
  );
};

//Mapping through ChannelList and creating a ChannelCard for each channel
var ChannelList = function ChannelList(props) {
  return React.createElement(
    "div",
    { className: "row" },
    React.createElement(
      "div",
      { className: "col-xs-12" },
      props.channels.map(function (channel) {
        return React.createElement(ChannelCard, {
          key: channel._id,
          channel: channel,
          deleteCard: props.deleteCard

        });
      })
    )
  );
};

var ChannelCard = function ChannelCard(props) {

  return React.createElement(
    "div",
    { className: "col-sm-6" },
    React.createElement(
      "div",
      { className: "channel text-center" },
      React.createElement("img", { className: "img-responsive channel-logo", src: props.channel.logo }),
      React.createElement(
        "a",
        { href: props.channel.url, target: "_blank" },
        React.createElement(
          "h3",
          { className: "channel-name" },
          " ",
          props.channel.display_name
        ),
        React.createElement(
          "p",
          { className: "channel-subtitle" },
          props.channel.error ? React.createElement(
            "div",
            null,
            props.channel.message
          ) : React.createElement(
            "div",
            null,
            " ",
            React.createElement(
              "em",
              null,
              props.channel.game
            ),
            " - ",
            props.channel.status
          )
        )
      ),
      React.createElement(
        "button",
        { className: "btn btn-default",
          type: "button",
          onClick: props.deleteCard,
          value: props.channel._id },
        " x"
      )
    )
  );
};

ReactDOM.render(React.createElement(Twitch, null), document.getElementById("twitch"));
SharkGame.Recycler = {
  tabId: "recycler",
  tabDiscovered: !1,
  tabName: "Recycler",
  tabBg: "img/bg/bg-recycler.png",
  sceneImage: "img/events/misc/scene-recycler.png",
  discoverReq: { upgrade: ["recyclerDiscovery"] },
  message:
    "The recycler allows for the repurposing of any and all of your unwanted materials.<br/><span class='medDesc'>Feed the machines. Feed them.</span>",
  recyclerInputMessages: [
    "The machines grind and churn.",
    "Screech clunk chomp munch erp.",
    "Clunk clunk clunk screeeeech.",
    "The recycler hungrily devours the stuff you offer.",
    "The offerings are no more.",
    "Viscous, oily mess sloshes within the machine.",
    "The recycler reprocesses.",
  ],
  recyclerOutputMessages: [
    "A brand new whatever!",
    "The recycler regurgitates your demand, immaculately formed.",
    "How does a weird blackish gel become THAT?",
    "Some more stuff to use! Maybe even to recycle!",
    "Gifts from the machine! Gifts that may have cost a terrible price!",
    "How considerate of this unfeeling, giant apparatus! It provides you stuff at inflated prices!",
  ],
  allowedCategories: {
    machines: "linear",
    stuff: "constant",
    processed: "constant",
    animals: "constant",
  },
  bannedResources: ["essence", "junk", "science", "seaApple"],
  init: function () {
    var e = SharkGame.Recycler;
    SharkGame.Tabs[e.tabId] = {
      id: e.tabId,
      name: e.tabName,
      discovered: e.tabDiscovered,
      discoverReq: e.discoverReq,
      code: e,
    };
  },
  switchTo: function () {
    var e = SharkGame.Recycler,
      a = SharkGame.Main,
      r = $("#content");
    r.append($("<div>").attr("id", "tabMessage"));
    var t = $("<div>").attr("id", "recyclerContainer");
    t.append($("<div>").attr("id", "inputButtons")),
      t.append($("<div>").attr("id", "junkDisplay")),
      t.append($("<div>").attr("id", "outputButtons")),
      r.append(t),
      r.append($("<div>").addClass("clear-fix"));
    var s = e.message,
      o = $("#tabMessage");
    SharkGame.Settings.current.showTabImages &&
      ((s =
        "<img width=400 height=200 src='" +
        e.sceneImage +
        "' id='tabSceneImageRed'>" +
        s),
      o.css("background-image", "url('" + e.tabBg + "')")),
      o.html(s),
      a.createBuyButtons("eat"),
      e.createButtons();
  },
  update: function () {
    var e = SharkGame.Recycler;
    e.updateJunkDisplay(), e.updateButtons();
  },
  updateJunkDisplay: function () {
    var e = SharkGame.Resources,
      a = (SharkGame.Recycler, SharkGame.Main),
      r = e.getResource("junk");
    $("#junkDisplay").html(
      "CONTENTS:<br/><br/>" + a.beautify(r) + "<br/><br/>RESIDUE",
    );
  },
  updateButtons: function () {
    var e = SharkGame.Resources,
      a = SharkGame.Recycler,
      r = SharkGame.Main;
    $.each(SharkGame.ResourceTable, function (t, s) {
      if (e.getTotalResource(t) > 0) {
        var o = $("#input-" + t),
          c = $("#output-" + t),
          n = e.getResource(t),
          u = SharkGame.Settings.current.buyAmount,
          i = 1 === u,
          h = u,
          l = u,
          m = a.getMaxToBuy(t);
        if (u < 0) {
          var d = -1 * Math.floor(u);
          (h = n / d), (l = m / d), (h = Math.floor(h)), (l = Math.floor(l));
        }
        var g = n < h || h <= 0,
          p = "Recycle ";
        h > 0 && (p += r.beautify(h) + " "),
          (p += e.getResourceName(t, g, i)),
          o.html(p).prop("disabled", g),
          (g = m < l || l <= 0),
          (p = "Convert to "),
          l > 0 && (p += r.beautify(l) + " "),
          (p += e.getResourceName(t, g, i)),
          c.html(p).prop("disabled", g);
      }
    });
  },
  createButtons: function () {
    var e = SharkGame.Resources,
      a = SharkGame.Recycler,
      r = (SharkGame.Main, $("#inputButtons")),
      t = $("#outputButtons");
    $.each(SharkGame.ResourceTable, function (s, o) {
      e.getTotalResource(s) > 0 &&
        a.allowedCategories[e.getCategoryOfResource(s)] &&
        -1 === a.bannedResources.indexOf(s) &&
        (SharkGame.Button.makeButton(
          "input-" + s,
          "Recycle " + e.getResourceName(s),
          r,
          a.onInput,
        ),
        SharkGame.Button.makeButton(
          "output-" + s,
          "Convert to " + e.getResourceName(s),
          t,
          a.onOutput,
        ));
    });
  },
  onInput: function () {
    var e = SharkGame.Resources,
      a = SharkGame.Log,
      r = SharkGame.Recycler,
      t = $(this),
      s = t.attr("id").split("-")[1],
      o = e.getResource(s),
      c = SharkGame.ResourceTable[s].value,
      n = SharkGame.Settings.current.buyAmount,
      u = n;
    n < 0 && ((u = o / (-1 * Math.floor(n))), (u = Math.floor(u)));
    o >= u
      ? (e.changeResource(s, -u),
        e.changeResource("junk", u * c),
        e.changeResource("tar", u * c * 1e-5),
        a.addMessage(SharkGame.choose(r.recyclerInputMessages)))
      : a.addMessage("You don't have enough for that!"),
      t.prop("disabled", !0);
  },
  onOutput: function () {
    var e = SharkGame.Resources,
      a = SharkGame.Log,
      r = SharkGame.Recycler,
      t = $(this),
      s = t.attr("id").split("-")[1],
      o = e.getResource("junk"),
      c = SharkGame.ResourceTable[s].value,
      n = SharkGame.Settings.current.buyAmount,
      u = n;
    if (n < 0) {
      var i = -1 * Math.floor(n);
      u = r.getMaxToBuy(s) / i;
    }
    var h,
      l = e.getResource(s),
      m = r.allowedCategories[e.getCategoryOfResource(s)];
    "linear" === m
      ? (h = SharkGame.MathUtil.linearCost(l, l + u, c))
      : "constant" === m && (h = SharkGame.MathUtil.constantCost(l, l + u, c)),
      o >= h
        ? (e.changeResource(s, u),
          e.changeResource("junk", -h),
          a.addMessage(SharkGame.choose(r.recyclerOutputMessages)))
        : a.addMessage("You don't have enough for that!"),
      t.prop("disabled", !0);
  },
  getMaxToBuy: function (e) {
    var a = SharkGame.Resources,
      r = SharkGame.Recycler,
      t = SharkGame.Resources.getResource(e),
      s = SharkGame.Resources.getResource("junk"),
      o = SharkGame.ResourceTable[e].value,
      c = a.getCategoryOfResource(e),
      n = 0;
    if (r.allowedCategories[c]) {
      var u = r.allowedCategories[c];
      "linear" === u
        ? (n = SharkGame.MathUtil.linearMax(t, s, o) - t)
        : "constant" === u && (n = SharkGame.MathUtil.constantMax(t, s, o) - t);
    }
    return Math.floor(n);
  },
};

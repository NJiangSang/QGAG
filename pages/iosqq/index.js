

var t = null,
    e = getApp();

Page({
    data: {
        showModel: !1,
        herolist: null,
        heroInfo: null,
        currHero: null,
        swiperList: e.globalData.swiperList
    },
    onLoad: function (e) {
        // 插屏广告id
        // wx.createInterstitialAd && ((t = wx.createInterstitialAd({
        //     adUnitId: "adunit-9252d5964c8347f9"
        // })).onLoad(function () {}), t.onError(function (t) {}), t.onClose(function () {}));
        var o = this;
        wx.showLoading({
            title: "阿贡正在努力查询..."
        }), wx.request({
            url: "https://www.xiaoyunyu.com/herolist.json",
            header: {
                "Content-Type": "application/json"
            },
            success: function (t) {
                200 == t.data.code && o.setData({
                    herolist: t.data.data
                });
            },
            complete: function () {
                wx.hideLoading();
            }
        });
    },
    onShow: function () {
        t && t.show().catch(function (t) {
            console.error(t);
        });
    },
    findHero: function (t) {
      var e = this;
      wx.showLoading({
        title: "阿贡正在努力查询..."
      });
      var o = t.currentTarget.dataset.hero;
      "" == o ? wx.showToast({
        title: "没有找到相关英雄",
        icon: "info"
      }) : (e.setData({
        currHero: o
      }), wx.request({
        url: "https://tool.cupmf.com/hero/detail.php",
        method: "POST",
        data: {
          name: o,
          type:"ios_qq"
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (t) {
          if (1000 == t.data.code) {
            var o = t.data.data;
            e.showModal(o);
          } else wx.showToast({
            title: "请求失败",
            icon: "info"
          });
        },
        complete: function () {
          wx.hideLoading();
        }
      }));
    },
    showModal: function (t) {
        this.setData({
            heroInfo: t,
            showModel: !0
        });
    },
    hideModal: function () {
        this.setData({
            heroInfo: null,
            showModel: !1
        });
    },



    onShareAppMessage: function () {
        return {
            title: "免费查王者荣耀战力排行榜，助你最低战力上榜！快速拿标！",
            path: "/pages/qq/index",
            imageUrl: "https://cy.wen1024.com/img/wzqs/share.png"
        };
    },
    onShareTimeline: function () {
        return {
            title: "免费查王者荣耀战力排行榜，助你最低战力上榜！快速拿标！",
            path: "/pages/qq/index"
        };
    }
});



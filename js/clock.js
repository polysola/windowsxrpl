// fix the horrible date API
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

Date.prototype.addMinutes = function (m) {
  this.setTime(this.getTime() + m * 60 * 1000);
  return this;
};

Date.prototype.addSeconds = function (s) {
  this.setTime(this.getTime() + s * 1000);
  return this;
};

/**
 * Clock class
 */

class Clock {
  constructor(config = {}) {
    const { selector = "data-clock", hasSeconds = true } = config;

    this.item = document.querySelector(`[${selector}]`);
    this.timezone = this.item.getAttribute(selector);
    this.opt = {
      sec: hasSeconds
    };

    console.log(this.opt);

    this.tick();
  }

  getDate(tz = null) {
    let date = new Date();
    date = convertTZ(date, tz);

    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    // normalize w/ 0s
    hh = ("0" + hh).slice(-2);
    mm = ("0" + mm).slice(-2);
    ss = ("0" + ss).slice(-2);

    return { hh, mm, ss };
  }

  tick() {
    setInterval((_) => {
      const dates = this.getDate(this.timezone);
      this.updateDom(dates);
    }, 1000);
  }

  updateDom({ hh, mm, ss }) {
    if (!this.opt.sec) {
      this.item.textContent = `${hh}:${mm}`;
    } else {
      this.item.textContent = `${hh}:${mm}:${ss}`;
    }
  }
}

/**
 * Utils
 */
function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString
    })
  );
}

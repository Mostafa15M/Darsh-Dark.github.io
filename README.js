function delayedServerTimeout(t) {
    setTimeout(function() {
        t.serverTimeout();
    }, this.serverTimeoutInMilliseconds);

    if (void 0 !== this._pingServerHandle) {
        var e = this._nextKeepAlive - (new Date()).getTime();
        e < 0 && (e = 0);
        this._pingServerHandle = setTimeout(
            ce(ie().mark(function e() {
                return ie().wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (t._connectionState !== fe.Connected) {
                                e.next = 9;
                                break;
                            }
                            return e.prev = 1, e.next = 4, t._sendMessage(t._cachedPingMessage);
                        case 4:
                            e.next = 9;
                            break;
                        case 6:
                            e.prev = 6, e.t0 = e.catch(1), t._cleanupPingTimer();
                        case 9:
                        case "end":
                            return e.stop();
                    }
                }, e, null, [
                    [1, 6]
                ]);
            })),
            e
        );
    }
}

function serverTimeout() {
    this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
}

function _invokeClientMethod(t) {
    var e = this,
        r = this._methods[t.target.toLowerCase()];
    if (r) {
        try {
            r.forEach(function(r) {
                return r.apply(e, t.arguments);
            });
        } catch (o) {
            this._logger.log(C.Error, "A callback for the method ".concat(t.target.toLowerCase(), " threw error '").concat(o, "'."));
        }
        if (t.invocationId) {
            var n = "Server requested a response, which is not supported in this version of the client.";
            this._logger.log(C.Error, n), this._stopPromise = this._stopInternal(new Error(n));
        }
    } else this._logger.log(C.Warning, "No client method with the name '".concat(t.target, "' found."));
}

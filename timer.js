function Timer(callback,timeInterval,options){
    this.timeInterval = timeInterval;

    //Add method to start timer.
    this.start = ()=>{
        this.expected = Date.now() + this.timeInterval;

        this.theTimeout = null;

        if(options.immediate){
            callback();
        }
        this.theTimeout = setTimeout(this.round, this.timeInterval);
        console.log('Time Started');

    }
    this.stop = () => {
        clearTimeout(this.timeout);
        console.log('Timer Stopped');
    }

    this.round = () =>{
        console.log('timeout',this.timeout);

        let drift = Date.now() - this.expected;
        if(drift>timeInterval){
            if(options.errorCallback){
                options.errorCallback();
            }
        }
        callback();
        this.expected += this.timeInterval;
        console.log('Drift:',drift);
        console.log('Next round time Interval', this.timeInterval-drift);
        this.timeout = setTimeout(this.round,this.timeInterval - drift);
    }
}

export default Timer;
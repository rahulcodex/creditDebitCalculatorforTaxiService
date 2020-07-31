const mongoose = require('mongoose'),

const slabmodel = mongoose.model('creditsdebits');


const creditdebitModel = mongoose.model('creditsdebits');

// function  to calculateCreditDebit

let calculatecreditdebit =(req, res)=>{
    
    if(check.isEmpty(req.body.driverId) || check.isEmpty(req.body.vehicleId) || check.isEmpty(req.body.distance)|| check.isEmpty(req.body.bookingid) )
    {

        let apiresponse  = response.generate('true', 'required parameter missing', 403, null)
          res.send(apiresponse); 
    }

    else {



        let distancetravel = req.body.distance;
       
        let Drivercredits = req.body.credits;

        let mincost = slabmodel.findOne({'status':'Active'})
        console.log(mincost);

           let Minslabcost = mincost[5];
           console.log(Minslabcost);
           let Minslabcost1 =  mincost[6];
           console.log(Minslabcost1);
            let Maxslabcost = mincost[7];
            console.log(Maxslabcost);


            if(distancetravel>0  && distancetravel<=25)
            {

                if(credits>0)
                {
                      let minslabcost = (distancetravel * Minslabcost);
                      console.log(minslabcost);
                      res.send(minslabcost);
                      Drivercredits = Drivercredits - minslabcost
                      console.log(Drivercredits);
                      res.send(Drivercredits);
                      
                }

                else  if(credits <0)
                {

                    let minslabcost =(distancetravel * Minslabcost);
                    console.log(minslabcost);
                    res.send(minslabcost);
                    Drivercredits =  minslabcost -Drivercredits;
                    console.log(Drivercredits);
                    res.send(Drivercredits);

                }

            }

            else if(distancetravel >25 && distancetravel<=50){

                if(credits>0)
                {
                      let minslabcost1 =  (distancetravel * Minslabcost1)
                      console.log(minslabcost1);
                      res.send(minslabcost1);
                      Drivercredits = Drivercredits- minslabcost1;
                      console.log(Drivercredits);
                      res.send(Drivercredits);
                }

                else if(credits<0)
                {
                     let minslabcost1 = (distancetravel * Minslabcost1)
                     console.log(minslabcost1);
                     res.send(minslabcost1);
                     Drivercredits = minslabcost1-Drivercredits;
                     console.log(Drivercredits);
                     res.send(Drivercredits);
                }

            }
            

            else if(distancetravel > 50 && distancetravel <100)
            {

                if(Drivercredits>0)
                {
                    let   maxslabcost = distancetravel * Maxslabcost;
                    console.log(maxslabcost)
                    res.send(maxslabcost);
                    let Drivercredits = Drivercredits - maxslabcost;
                    console.log(Drivercredits);
                    res.send(Drivercredits);
                }

                else if(Drivercredits<0)
                {
                   let maxslabcost = distancetravel * maxslabcost;
                   console.log(maxslabcost);
                   res.send(maxslabcost);
                   Drivercredits = maxslabcost - Drivercredits;
                   console.log(Drivercredits);
                   res.send(Drivercredits);

                }

            }

        let newdata = new creditdebitModel ({

              driverId : req.body.driverId,
              bookingid : req.body.bookingid,
              transactionId :shortid.generate(),
               distance:req.body.distance,
               vehicleId:req.body.vehicleId,
               credits:Drivercredits,


        })


        newdata.save((err, result)=>{
            if(err)
            {
                logger.error(`error occured ${err}`, database, 10);
                let apiresponse = response.generate('true' , 'some error occured' , 500, null)
                res.send(apiresponse);

            }

            else {
                let apiresponse = response.generate('false', ' creditsanddebits calculated succesfully', 200 , result)
                res.send(apiresponse);
            }

        })
    }

}

// end  of calculateCreditDebitFunction

let getcreditdebit =(req, res)=>{

    if(check.isEmpty(request.params.bookingid))
    {
        let apiresponse = response.generate('true', 'required parameter is missing', 403, null);
        res.send(apiresponse);
        console.log(apiresponse);
    }

    else 
    {


         creditdebitModel.findOne({'bookingid':req.params},(err, result)=>{

            if(err)
            {
                logger.error(`some error occured ${err}`, 'database', 10);
                let  apiresponse = response.generate('true', 'some error occured', 500, result)
                res.send(apiresponse)
                console.log(err)
            }

            else {
                let apiresponse = response.generate('false' , 'data fetched succesfully' , 200, result)
                res.send(apiresponse);
                console.log(result)
            }
         })

    }

}

// end of getCreditDebit function





module.exports = {

 
calculatecreditdebit:calculatecreditdebit,
getcreditdebit:getcreditdebit



}
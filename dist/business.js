export const business = {name:'Martinez Logistics LLC', tagline:'Chauffeur service', phone:null, email:'MARTINEZLOGISTICSLLC@GMAIL.COM', bookingUrl:'https://www.martinezlogisticsllc.com/appointments', schedulerUrl:'https://app.acuityscheduling.com/schedule/81fbe8dc', timezone:'America/New_York', origin:'https://martinez-logistics.vercel.app', cinematicVideo:null, cinematicPoster:'/assets/hero.png'};
export const options = [
{id:'luxury-sedan',name:'Luxury Sedan',category:'Sedan',price:165,type:'Hourly'},
{id:'luxury-suv',name:'Luxury SUV',category:'SUV',price:197,type:'Hourly'},
{id:'luxury-sprinter',name:'Luxury Sprinter',category:'Sprinter',price:550,type:'Hourly'},
{id:'atl-departure-sedan',name:'ATL Departure Transfer-Sedan',category:'Sedan',price:120,type:'Departure'},
{id:'atl-arrival-sedan',name:'ATL Arrivals Transfer-Sedan',category:'Sedan',price:125,type:'Arrival'},
{id:'atl-arrival-suv',name:'ATL Arrivals Transfer-SUV',category:'SUV',price:185,type:'Arrival'},
{id:'atl-departure-suv',name:'ATL Departures Transfer-SUV',category:'SUV',price:180,type:'Departure'},
{id:'atl-departure-sprinter',name:'ATL Departures Transfer-Sprinter',category:'Sprinter',price:400,type:'Departure'},
{id:'atl-arrival-sprinter',name:'ATL Arrival Transfer-Sprinter',category:'Sprinter',price:400,type:'Arrival'}];
const appointmentIds=['96624196','96624243','96624281','96624313','96624370','96624450','96624499','96624517','96624553'];
options.forEach((option,index)=>{option.appointmentId=appointmentIds[index];option.bookingUrl=`${business.schedulerUrl}/appointment/${option.appointmentId}/calendar/14399125`});
export const categoryDetails = {
 Sedan:{headline:'A quieter kind of luxury.',description:'For journeys that call for a personal touch. Explore the Luxury Sedan hourly service or select an ATL arrival or departure transfer.',image:null,model:null},
 SUV:{headline:'Presence, with purpose.',description:'A distinctive choice for your next arrival. Explore the Luxury SUV hourly service and dedicated ATL transfer listings.',image:'/assets/hero.png',model:null},
 Sprinter:{headline:'Room for your plans.',description:'Explore the Luxury Sprinter category for hourly chauffeur service and ATL arrival or departure transfers. Confirm seating and luggage requirements before booking.',image:null,model:null}
};

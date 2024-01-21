export const toCTR = (orders, views, chartBool=false) => {
    const CTR_NUM = (Number(orders) / Number(views))

    const CTR_PER = (CTR_NUM * 100).toFixed(2)
    
    // const zeroNum = String(CTR_IN_PER).slice(String(CTR_IN_PER).length-2)
    
    // const CTR_PER = zeroNum == '00' ? String(CTR_IN_PER).slice(0, String(CTR_IN_PER).length-3) : CTR_IN_PER

    if(chartBool) {
        return  isNaN(Number(CTR_PER)) ? 0 : Number(CTR_PER)
    }else{
        return `${ isNaN(Number(CTR_PER)) ? '-' : (`${Number(CTR_PER)}%`)}`
    }
    
}

export const toINCOME = (orders, price) => {
    // console.log(orders, price)

    const SUM_INCOME = orders * price

    return SUM_INCOME
}


export const sumKeyData = (arr, key) => {
    return arr.reduce((acc, obj) => {
        if (typeof obj[key] === "number") {
          return acc + obj[key];
        } else {
          return acc;
        }
      }, 0);
}

export const sumKeyArrayData = (array, props) => {

    let total = 0;
    array.forEach(item => {
      item.Analytic.forEach(anal => {
        total += anal[props];
      })
    });

    return total;
}


export const sumINCOME = (array) => {
    let total = 0;
    array.forEach(item => {
        const totalOrders = sumKeyData(item.Analytic, 'orders')
        console.log(totalOrders)

        total += totalOrders * item.price
    });

    return total.toFixed(2)
}

export const LAST_DATA = (n, chartBool) => {
    let dates = [];
    for (let i = 0; i < n; i++) {
      let date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');


      let formattedDate = chartBool ? `${month}-${day}` : `${year}-${month}-${day}` 
      
      dates.push(formattedDate);
    }
    return dates.reverse();
}


export const sumAnalDate = (dates, data) => {
    const result = [];
    for (const date of dates) {
      let clicks = 0;
      let views = 0;
      let orders = 0;
      let CTR = 0;
      for (const obj of data) {
        const analytics = obj.Analytic;
        for (const analytic of analytics) {
          if (analytic.createdAt === date) {
            clicks += parseInt(analytic.clicks);
            views += parseInt(analytic.views);
            orders += parseInt(analytic.orders);
          }
        }
      }
      CTR = toCTR(orders, views, true)
      result.push({ date, clicks, views, orders, ctr: CTR });
    }
    console.log(result)
    return result;
  }
  

  export const DATE_RANGE = (startDate, endDate) => {
    const dates = [];
    const oneDay = 24 * 60 * 60 * 1000;
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      
      dates.push(new Date(date).toISOString().slice(0, 10));
    }
  
    return dates;
  }
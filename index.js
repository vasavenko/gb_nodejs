import colors from 'colors'

const [ num1, num2 ] = process.argv.slice(2)

function getPrimes(num1, num2) {

  if (!/\d+/gm.test(+num1) || !/\d+/gm.test(+num2)) {
    console.log(colors.red("Необходимо передать два числа"))
    return
  }

  if (+num1 > +num2) [ num1, num2 ] = [ num2, num1 ]
  
  const seive = [];
  const primes = [];
  let j = 0

  for (let i = 2; i <= num2; i++) {
    if (!seive[i]) {
      primes.push(i);

      if (i >= num1 && j==0) {
        console.log(colors.green(i))
        j++
      } else if (i >= num1 && j==1) {
        console.log(colors.yellow(i))
        j++
      } else if (i >= num1 && j==2) {
        console.log(colors.red(i))
        j=0
      }

      for (let j = i * i; j <= num2; j += i) {
        seive[j] = true;
      } 
    }
  }

  const pr = primes.filter((item) => item >= num1)
  if (!pr.length) {
    return console.log(colors.red('В указанном диапазоне простых чисел нет!'))
   }

  return;
}

getPrimes(num1, num2);
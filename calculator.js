
class Calculator
{
    constructor(previousoperandtextelement,currentoperandtextelement)
    {
        this.previousoperandtextelement=previousoperandtextelement;
        this.currentoperandtextelement=currentoperandtextelement;
        this.clear()
    }

    clear()
    {
       this.previousoperand = '';
       this.currentoperand= '';
       this.operation = '';
    }

    delete()
    {
       this.currentoperand=this.currentoperand.toString().slice(0,-1);
    }

    appendNumber(number)
    {
        if(number === '.'&&this.currentoperand.includes('.'))
            return;
        
      this.currentoperand = this.currentoperand.toString() + number.toString();
    }

    chooseOperation(operation)
    {
      if(this.currentoperand === '')
        return
             
      if(this.previousoperand!== '')
      {
          this.compute()
      }
        this.operation= operation;
       this.previousoperand= this.currentoperand;
       this.currentoperand='';
    }

    compute()
    {
      let computation
      const prev=parseFloat(this.previousoperand)
      const current=parseFloat(this.currentoperand)
      if(isNaN(prev) || isNaN(current))
        return
       
      switch(this.operation)
      {
          case '+':
                computation= prev+current;
                break;
          
          case '-':
                computation=prev-current;
                break;

          case '*':
                    computation= prev*current;
                    break;

          case '/':
                
                               
                computation= prev/current;
                break
                
          default:
             return;
      }
      this.currentoperand = computation;
      this.previousoperand = ''
      this.operation = undefined;
    }

    getDisplayNumber(number)
    {
        const Stringnumber = number.toString();
        const Integerdigits = parseFloat(Stringnumber.split('.')[0]);
        const Decimaldigits = Stringnumber.split('.')[1];

        let IntegerDisplay
        if (isNaN(Integerdigits)) {

            IntegerDisplay = '';
            
        }

        else
        {
            IntegerDisplay =Integerdigits.toLocaleString('en',{maximumFractionDigits:0});
        }

        if(Decimaldigits!= null)
        {
            return `${IntegerDisplay}.${Decimaldigits}`;
        }

        else
        {
            return IntegerDisplay;
        }
    }

    updateDisplay()
    {
       this.currentoperandtextelement.innerText = this.getDisplayNumber(this.currentoperand);
       if(this.operation != null)
       {
       this.previousoperandtextelement.innerText = `${this.getDisplayNumber(this.previousoperand)} ${this.operation}`;
    }
    else{
        this.previousoperandtextelement.innerText = ' ';
    }
}
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allclearsButton = document.querySelector('[data-all-clear]');
const equalstoButton = document.querySelector('[data-equals]');
const previousoperandtextelement = document.querySelector('[data-previous-operand]');
const currentoperandtextelement = document.querySelector('[data-current-operand]');

const calc = new Calculator(previousoperandtextelement,currentoperandtextelement);

numberButtons.forEach(button => {
     button.addEventListener('click',() => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click',() => {
       calc.chooseOperation(button.innerText);
       calc.updateDisplay();
   })
})

equalstoButton.addEventListener('click',button => {
    calc.compute();
    calc.updateDisplay();
})

allclearsButton.addEventListener('click',button => {
    calc.clear();
    calc.updateDisplay();
})

deleteButton.addEventListener('click',button => {
    calc.delete();
    calc.updateDisplay();
})
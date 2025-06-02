function logger<T extends new (...arg: any[]) => any>(
  target: T,
  ctx: ClassDecoratorContext
) {
  console.log('logger decorator')
  console.log(target)
  console.log(ctx)

  return class extends target {
    constructor(...arg: any[]) {
      super(...arg)
      console.log('class constructor')
      console.log(this)
    }
  }
}

function autobind(
  target: (...args: any[]) => any,
  ctx: ClassMethodDecoratorContext
) {
  ctx.addInitializer(function (this: any) {
    this[ctx.name] = this[ctx.name].bind(this)
  })

  return function (this: any) {
    console.log('Executing original function')
    target.apply(this)
  }
}

function replacer<T>(initValue: T) {
  return function replacerDecorator(
    target: undefined,
    ctx: ClassFieldDecoratorContext
  ) {
    console.log(target)
    console.log(ctx)

    return (initialValue: any) => {
      console.log('initialValue:', initialValue)
      return initValue
    }
  }
}

@logger
class Person {
  @replacer('')
  name = 'Oleh'

  @autobind
  greet() {
    console.log('Hi, I am ' + this.name)
  }
}

const oleh = new Person()
const greet = oleh.greet
greet()

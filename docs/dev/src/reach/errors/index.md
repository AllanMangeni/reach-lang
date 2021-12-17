




# {#ref-error-codes} Error Codes

This section provides an in depth explanation of the error codes produced from
the Reach compiler.
See the list on the left bar.



## {#RA0000} RA0000

This error indicates that a program, targeting the Algorand connector, is attempting to
transfer a `{!reach} Token` in the same consensus step it was created in. It is impossible
to perform this action because one must opt-in to receive a token on Algorand. To opt-in, one must
know the id, however the id of the token cannot be known until after the transaction that created it.

The following code erroneously tries to transfer a newly created `{!reach} Token`:

```reach
Alice.publish();
const tok = new Token({ supply: 5 });
transfer(5, tok).to(Alice);
commit();
```


This can be fixed by performing a `{!reach} commit` after creating the token and transferring the
token in the next consensus step:

```reach
Alice.publish();
const tok = new Token({ supply: 5 });
commit();
Alice.interact.informOfTokenId(tok);
Alice.publish();
transfer(5, tok).to(Alice);
commit();
```


The frontend can have `{!reach} Alice` opt-in to the token in `{!reach} informOfTokenId` by utilizing
`{!js} acc.tokenAccept()`.

## {#RA0001} RA0001

This error indicates that a program, targeting the Algorand connector, is attempting to pay a `{!reach} Token` at the same time it is published.
It is impossible to perform this action because one must opt-in to receive a token on Algorand.
To opt-in, one must know the id, however the application cannot learn the application until after it has received the publication, which must occur after all pay transactions.

The following code has this error:

```reach
Alice.publish(tok).pay([[5, tok]]);
commit();
```


This can be fixed by performing the `{!reach} publish` and `{!reach} pay` in two steps:
token in the next consensus step:

```reach
Alice.publish(tok);
commit();
Alice.pay([[5, tok]]);
commit();
```


## {#RC0000} RC0000

This error indicates that the program uses a number that is beyond the range of acceptable numbers for the given
connector.

For example, the code below uses a value too large for the `{!reach} ALGO` connector:

```reach
const y = 18446744073709551616;
```


You can fix this error by having your frontend provide the value and accessing it
via the participant interact interface:

```reach
const A = Participant('A', {
  // extend participant interact interface
  y: UInt,
});
A.only(() => {
  const y = declassify(interact.y);
});
```


Alternatively, you can fix this by not compiling to the given connector, in which
case, your application will no longer be blockchain agnostic.

## {#RE0000} RE0000

This error indicates that you provided an incorrect number of arguments to a function.

For example, the code below applies one value to `{!reach} f`:

```reach
const f = () => { return 3 };
const x = f(5);
```


You can fix this by providing the same amount of arguments expected:

```reach
const f = () => { return 3 };
const x = f();
```


## {#RE0001} RE0001

This error indicates that a program uses an invalid assignment operator.
Reach only supports assignment using the `{!reach} =` operator. Any other operator,
such as `{!reach} +=, *=, ...` is not allowed.

For example, the code below erroneously tries to re-assign `{!reach} x` at the end of
a `{!reach} while` loop:

```reach
x *= 2;
continue;
```


You can fix this by explicitly writing out the operation on the right hand
side of `{!reach} =`:

```reach
x = x * 2;
continue;
```


Keep in mind, that the assignment operator is a form of mutation and is only allowed
immediately before a `{!reach} continue`.

## {#RE0002} RE0002

This error indicates that a program uses an invalid statement.
Reach is a strict subset of JavaScript and does not accept every statement
that is valid JavaScript. It may be necessary to express your program
with different constructs than you would JavaScript.

For example, the code below erroneously uses a `{!js} for` loop, which is not
supported in Reach:

```reach
for (let i = 0; i < arr.length; i++) {
  // ...
}
```


You can fix this by either using a `{!reach} while` loop or a combination of
`{!reach} Array.iota` and `{!reach} Array.map/Array.forEach`:

```reach
Array.iota(arr.length).map((i) => {
  // ...
});
```


## {#RE0003} RE0003

This error indicates that a statement block returns a non-null value although a `{!reach} null` value is expected.
The block should either use a `{!reach} return null;` statement or no return statement at all.

## {#RE0004} RE0004

This error indicates that the program uses `{!reach} var` incorrectly.
In Reach, `{!reach} var` is only allowed immediately before a while loop and its `{!reach} invariant`.

For example, this code erroneously tries to declare `{!reach} x` as a mutable variable then
re-assign it at some point:

```reach
var x = 0;
if (iAmLegend) {
  x = 5;
}
```


You can fix this by using `{!reach} const` and either creating fresh variables or collapsing the logic if simple enough:

```reach
const x = 0;
const xPrime = iAmLegend ? 5 : x
// or
const x = iAmLegend ? 5 : 0;
```


## {#RE0005} RE0005

This error indicates an incorrect use of `{!reach} while`. `{!reach} while` must be immediately
prefaced by a `{!reach} var` and `{!reach} invariant` declaration.

For example, this code erroneously tries to run a continuous loop where Alice pays `{!reach} 1` network token
per loop:

```reach
while (true) {
  commit();
  Alice.pay(1);
  continue;
}
```


Reach requires the `{!reach} invariant` to reason about the `{!reach} while` loop during verification. You
can fix this by adding a `{!reach} var` and `{!reach} invariant` declaration before the loop:

```reach
var rounds = 0;
invariant(balance() == rounds);
while (true) {
  commit();
  Alice.pay(1);
  rounds = rounds + 1;
  continue;
}
```


## {#RE0006} RE0006

@{errver(false, "v0.1")}

This error indicates that `{!reach} return` may not be used within the current statement block.

## {#RE0007} RE0007

This error indicates that the `{!reach} timeout` branch of a statement such
as `{!reach} publish, pay, fork` has been given the wrong arguments.

For example, the following code erroneously attempts to `{!reach} closeTo(Bob)` in the event that
`{!reach} Alice` does not publish in time:

```reach
Alice
  .publish()
  .timeout(5, closeTo(Bob));
```


However, the second argument of the `{!reach} timeout` branch must be a thunk. You can fix this by
wrapping `{!reach} closeTo(Bob)` in an arrow expression:

```reach
Alice
  .publish()
  .timeout(5, () => closeTo(Bob));
```


## {#RE0008} RE0008

This error indicates that a `{!reach} timeout` branch of a statement such as
`{!reach} publish, pay, fork` has not been given a block of code to execute in the
event of a `{!reach} timeout`.

For example, the code below erroneously provides a `{!reach} timeout` delay, but does
not specify a function to run if the timeout occurs:

```reach
A.pay(0)
 .timeout(1);
```


You can fix this by providing a function as a second argument to `{!reach} timeout`:

```reach
A.pay(0)
 .timeout(1, () => {
    // ...
  });
```


## {#RE0009} RE0009

This error indicates that the pay amount provided states the amount of
network tokens more than once.

For example, the code below erroneously provides two atomic values in the pay amount,
which are both interpreted as the amount of network tokens to pay:

```reach
A.pay([ amt, amt, [ amt, tok ]]);
```


You can fix this by deleting one of the atomic values:

```reach
A.pay([ amt, [ amt, tok ]]);
```


## {#RE0010} RE0010

This error indicates that the pay amount provided states the amount of
a specific non-network token more than once.

For example, the code below erroneously provides two tuples in the pay amount,
both of which specify the amount of the same token:

```reach
A.pay([ amt, [amt, tok ], [ amt, tok ] ]);
```


You can fix this by deleting one of the tuples:

```reach
A.pay([ amt, [amt, tok ] ]);
```


## {#RE0011} RE0011

This error indicates that the pay amount provided does not provide values of the correct
type.

For example, the code below erroneously provides a pay amount that consists of a one element
tuple:

```reach
A.pay([ amt, [ amt ] ];)
```


However, a tuple in a pay amount must specify the amount and the `{!reach} Token`. You can fix this
by adding the `{!reach} Token` to the tuple:

```reach
// tok : Token
A.pay([ amt, [ amt, tok ] ];)
```


## {#RE0012} RE0012

This error indicates that a participant interact interface field has a type that is not first-order.
That is, an interact function has a return type of a function, which is not allowed in Reach.

For example, the code below erroneously provides an interact function that returns another function:

```reach
const A = Participant('A', {
  'curriedAdd': Fun([UInt], Fun([UInt], UInt));
});
```


the frontend may look like this:

```js
await Promise.all([
  backend.A(ctcA, {
    curriedAdd: (x) => (y) => x + y;
  })
]);
```


You can fix this by decoupling the functions and calling them sequentially. This technique requires
changes to the frontend as well since we are changing the signature:

```reach
const A = Participant('A', {
  'curriedAdd1': Fun([UInt], Null);
  'curriedAdd2': Fun([UInt], UInt);
});
// ...
A.only(() => {
  interact.curriedAdd1(1);
  const result = declassify(interact.curriedAdd2(1));
});
```


the frontend may look like this:

```js
let x_;
await Promise.all([
  backend.A(ctcA, {
    curriedAdd1: (x) => { x_ = x; },
    curriedAdd2: (y) => { return x_ + y; }
  })
]);
```


## {#RE0013} RE0013

This error indicates that you provided an unrecognized option to `{!reach} setOptions`.
There is most likely a typo in your code.

Please review the recognized options in the documentation for `{!reach} setOptions`.

## {#RE0014} RE0014

This error indicates that you did not provide an acceptable value for a specific option
in `{!reach} setOptions`.

Please review the eligible values listed in the documentation for `{!reach} setOptions`.

## {#RE0015} RE0015

This error indicates that your participant interact interface does not provide a `{!reach} Type`
for a given field.

For example, in the erroneous code below, `{!reach} x` is assigned `{!reach} 3` in the participant interact interface
of `{!reach} Alice`:

```reach
const Alice = Participant('Alice', {
  'x': 3,
});
```


However, the interact interface specifies the type of values that will be provided at runtime. You can fix this by
either making `{!reach} x` a variable within Alice's scope inside the program:

```reach
const Alice = Participant('Alice', {});
deploy();
Alice.only(() => {
  const x = 3;
});
```


or by putting `{!reach} 3` as the value of `{!reach} x` in your frontend and adjusting the
participant interact interface to list the type:

```reach
const Alice = Participant('Alice', {
  'x': UInt,
});
```



## {#RE0016} RE0016

This error indicates that the arguments passed to `{!reach} Reach.App` are incorrect.
`{!reach} Reach.App` accepts a single thunk as its argument.

For example, the code below erroneously declares a `{!reach} Reach.App` without too
many arguments:

```reach
export const main = Reach.App({}, () => {
});
```


You can fix this by ensuring only one argument is passed to `{!reach} Reach.App`,
which is a function with no arguments:

```reach
export const main = Reach.App(() => {
});
```


## {#RE0017} RE0017

This error indicates that the name of the `{!reach} Participant` or `{!reach} View` provided
is invalid. These names must satisfy the regex `{!reach} [a-zA-Z][_a-zA-Z0-9]*`.

For example, the code below provides a Participant name that is unsatisfactory:

```reach
const P = Participant('Part 4!', {});
```


You can fix this by removing any illegal characters and replacing spaces with underscores:

```reach
const P = Participant('Part_4', {});
```


## {#RE0018} RE0018

This error indicates that an invalid expression is used on the left hand side of an
assignment.

For example, the code below erroneously puts an arithmetic expression on the left hand
side of an assignment:

```reach
const (f + 1) = 10;
```


You can fix this by moving all the arithmetic to the right hand side, leaving only the variable
on the left:

```reach
const f = 10 - 1;
```


## {#RE0019} RE0019

This error indicates that an object spread is occurring before the last position in a
destructuring assignment. It must come last due to the fact it binds the remaining
elements to the given variable.

For example, the code below erroneously attempts to destructure one element `{!reach} y`
and the remaining elements into `{!reach} x`:

```reach
const {...x, y} = {x: 1, y: 2, z: 3};
```


You can fix this by moving `{!reach} ...x` to the last position:

```reach
const {y, ...x} = {x: 1, y: 2, z: 3};
```


## {#RE0020} RE0020

This error indicates that an array spread is occurring before the last position in a
destructuring assignment. It must come last due to the fact it binds the remaining
elements to the given variable.

For example, the code below erroneously attempts to destructure one element `{!reach} y`
and the remaining elements into `{!reach} x`:

```reach
const [...x, y] = [1, 2, 3];
```


You can fix this by moving `{!reach} ...x` to the last position:

```reach
const [y, ...x] = [1, 2, 3];
```


## {#RE0021} RE0021

This error indicates that the compiler expected to receive a closure, but
it was given a different value.

For example, the code below erroneously attempts to provide a value for
the `{!reach} match` case of a nullary `{!reach} Data` constructor:

```reach
Maybe(UInt).None().match({
  None: 0,
  Some: (x) => x
});
```


You can fix this by wrapping the value `{!reach} 0` in an arrow expression because
`{!reach} match` expects all cases to be bound to closures:

```reach
Maybe(UInt).None().match({
  None: () => 0,
  Some: (x) => x
});
```


## {#RE0022} RE0022

This error indicates that there was an invalid declaration. This error will
occur when attempting to bind multiple variables within a single `{!reach} const`.

For example, the code below erroneously attempts to bind `{!reach} x` and `{!reach} y`
within one `{!reach} const` assignment:

```reach
const x = 1, y = 2;
```


You can fix this by breaking apart the declarations into two `{!reach} const` statements:

```reach
const x = 1;
const y = 2;
```


## {#RE0023} RE0023

@{errver(false, "v0.1")}

This error indicates that there was an invalid declaration.

## {#RE0024} RE0024

This error indicates that there is an attempt to unpack an `{!reach} array`, but the binding
does not expect the same amount of values that the `{!reach} array` contains.

For example, the code below erroneously tries to unpack an `{!reach} array` of 3 values into
2 variables:

```reach
const [ x, y ] = [ 1, 2, 3 ];
```


You can fix this by either binding or ignoring, via `{!reach} _`, the last element of the `{!reach} array`:

```reach
const [ x, y, _ ] = [ 1, 2, 3 ];
```



## {#RE0025} RE0025

This error indicates that there is an attempt to access a field of an `{!reach} object`
that does not exist. Ensure that you are referring to the correct name, or
add the needed field to the `{!reach} object` if necessary.

## {#RE0026} RE0026

This error indicates that the `{!reach} continue` statement is used outside of a
`{!reach} while` loop. To fix this issue, delete the erroneous `{!reach} continue`,
or move it to the end of your `{!reach} while` loop.

## {#RE0027} RE0027

This error indicates that there is an attempt to consult the consensus time before the first publication.
This situation is not allowed, because before the first publication, there is no consensual agreement on time in the decentralized computation.

```reach
export const main = Reach.App(() => {
  const A = Participant('Alice', {});
  deploy();
  wait(relativeTime(1));
});
```


You can fix this by having a `{!reach} Participant` `{!reach} publish` first:

```reach
export const main = Reach.App(() => {
  const A = Participant('Alice', {});
  deploy();
  A.publish();
  wait(relativeTime(1));
});
```


## {#RE0028} RE0028

This error indicates that a the variable update inside of a loop, e.g. `{!reach} while`,
is attempting to mutate variables that are not mutable. For a `{!reach} while` loop, this
means the variable was not declared with `{!reach} var` prior to the loop.

For example, the code below erroneously attempts to mutate `{!reach} y` which has not been
defined via `{!reach} var`:

```reach
var [x] = [1];
invariant(true);
while(x < 2) {
  [ x, y ] = [ x + 1, x ];
  continue;
}
```


You can fix this by either deleting `{!reach} y` or adding it to the variable list:

```reach
var [ x, y ] = [ 1, 1 ];
invariant(true);
while(x < 2) {
  [ x, y ] = [ x + 1, x ];
  continue;
}
```



## {#RE0029} RE0029

This error indicates an attempt to bind a `{!reach} ParticipantClass` to a
specific `{!reach} Address`.

For example, the example code below erroneously tries to `{!reach} set` a `{!reach} ParticipantClass`
to a specific address:

```reach
const C = ParticipantClass('C', {});
// ...
C.set(addr);
```


You can fix this by using a `{!reach} Participant`, which may be associated with a single address:

```reach
const C = Participant('C', {});
// ...
C.set(addr);
```


## {#RE0030} RE0030

This error indicates an attempt to re-bind a `{!reach} Participant` to another `{!reach} Address`.
Once a `{!reach} Participant` is bound to an `{!reach} Address`, either by making a publication
or explicitly via `{!reach} Participant.set`, they may not be re-bound.

For example, the code below erroneously has `{!reach} Bob` make a publication, then later,
attempts to bind him to a specific address:

```reach
Bob.publish();
// ...
Bob.set(addr);
```


You can fix this by deleting one of the statements (depending on the logic of your application).

## {#RE0031} RE0031

This error indicates that you are attempting to use a specific statement or expression in the wrong
mode. Consult the documentation for the specific keyword to learn more about what mode is
expected. Additionally, see the figure on @{seclink("ref-programs")} for a diagram regarding the modes
of a Reach application.

## {#RE0032} RE0032

This error indicates that you are attempting to mutate a variable in an inappropriate place.
Variable mutation is only allowed to occur on variables declared via `{!reach} var` and immediately
before a `{!reach} continue` statement of a loop.

For example, the code below attempts to mutate a loop variable improperly:

```reach
var [ x ] = [ 0 ];
invariant(balance() == 0);
while (true) {
  commit();
  x = 1;
  // ...
  continue;
}
```


You can fix this issue by moving the mutation directly before the `{!reach} continue`:

```reach
var [ x ] = [ 0 ];
invariant(balance() == 0);
while (true) {
  commit();
  // ...
  x = 1;
  continue;
}
```


## {#RE0033} RE0033

This error indicates you are using an illegal JavaScript expression in Reach. Not all JavaScript
expressions are valid Reach, as they are not applicable to the language.

## {#RE0034} RE0034

This error indicates that there is nowhere to return to in the current statement block.
This may occur if you write a `{!reach} return` statement at the top level of a file
or if you've already wrote a `{!reach} return` statement.

For example, the code below has two `{!reach} return` statements, the first of which will
always occur, since it is not within a conditional:

```reach
const f = () => {
  return 0;
  return 1;
};
```


You can fix this by removing the second `{!reach} return` which is dead code:

```reach
const f = () => {
  return 0;
}
```


## {#RE0035} RE0035

This error indicates that a value, which is not a function, is being
applied as if it were a function. Ensure you are writing the correct name
of the function you intend to use.

For example, the code below has two variables: `{!reach} f` and `{!reach} g`:

```reach
const f = () => 2;
const g = 2;
const h = g();
```


`{!reach} g` is being applied as if it were a function, although we really intended
on calling `{!reach} f`. This can be fixed by ensuring we call a function:

```reach
const f = () => 2;
const g = 2;
const h = f();
```


## {#RE0036} RE0036

This error indicates that a value, which is not a function, is being
applied as if it were a function.

For example, the code erroneously tries to create an `{!reach} array` the same
size as `{!reach} arr`, but filled with `{!reach} 1`:

```reach
const a = arr.map(1);
```


You can fix this code by providing a function to `{!reach} Array.map`:

```reach
const a = arr.map((_) => 1);
```


## {#RE0037} RE0037

This error indicates that a value, which is not an `{!reach} Object`, is being
treated as if it were an `{!reach} Object`. This error occurs when you try to access
a field of an erroneous value. This issue is most likely caused by a typo in your
program.

## {#RE0038} RE0038

This error indicates that a value, which is not an `{!reach} Array` or `{!reach} Tuple`, is being
treated as if it were. This error occurs when you try to access
an element of an erroneous value. This issue is most likely caused by a typo in your
program.

## {#RE0039} RE0039

This error indicates that there is an attempt to dereference an `{!reach} Array` or `{!reach} Tuple`
with a non-numerical value. You must use a value of type `{!reach} UInt` to dereference
an `{!reach} Array`.

## {#RE0040} RE0040

This error indicates that you are using a dynamic value to dereference a value which is not an `{!reach} Array`.
This issue is most likely caused by a typo. Please ensure you are dereferencing an `{!reach} Array`.

## {#RE0041} RE0041

This error indicates that there is an attempt to statically dereference an `{!reach} Array` beyond its bounds.
Ensure you are using an index that is between `0` and `1` less than the length of the `{!reach} Array`.

## {#RE0042} RE0042

This error indicates that there is an attempt to reference an identifier that is not in scope. This issue may be
caused by a typo, a scoping issue, or a missing `{!reach} import`.

For example, the code below declares a function with a variable `{!reach} x` declared within it. Attempting to reference
`{!reach} x` outside of the function will result in an error:

```reach
const f = () => {
  const x = 5;
}
const y = x;
```


You can fix this issue by returning the value of `{!reach} x` from the function:

```reach
const f = () => {
  const x = 5;
  return x;
}
const y = f();
```


If you are attempting to use a value from a library, simply add the necessary `{!reach} import` to the top
of the Reach file.

## {#RE0043} RE0043

This error indicates that there is a mismatch between the expected security levels of a variable
and the actual one provided. This may happen if you use a public variable where a secret
is expected, or vice versa.

For example, the code below erroneously declassifies the variable `{!reach} x`, which is not secret:

```reach
const x = 0;
A.only(() => {
  const y = declassify(x);
});
```


You can fix this issue by simply assigning `{!reach} y` to `{!reach} x`.

## {#RE0044} RE0044

This error indicates that you provided an incorrect number of arguments to a function. You can fix this
by providing the same amount of arguments expected.

## {#RE0045} RE0045

This error indicates that an anonymous function was provided a name, which is not allowed.

For example, the code below names the anonymous function `{!reach} m`:

```reach
const x = array(UInt, [0, 1, 2]);
const y = x.map(function m(i){ return i + 1; });
```


You can fix this by removing the function name:

```reach
const x = array(UInt, [0, 1, 2]);
const y = x.map(function (i){ return i + 1; });
```


## {#RE0046} RE0046

This error indicates that there was an invalid syntax used for an `{!reach} import`.
The acceptable `{!reach} import` formats are defined in the documentation for the keyword.

For example, the code below erroneously performs a default `{!reach} import`:

```reach
import blah from 'sample_lib.rsh';
```


You can fix this code by explicitly importing the bindings you want:

```reach
import {a,b,c} from 'sample_lib.rsh';
```


or by binding all the exports to an identifier:

```reach
import * as lib from 'sample_lib.rsh';
```


## {#RE0047} RE0047

@{errver(false, "v0.1")}

This error indicates that there was a `{!reach} return` statement
at the top level.

## {#RE0048} RE0048

This error indicates that the Reach file does not have a header at
the top of the file. The first top level statement of a Reach module
must indicate what version of Reach the file uses.

For example, the code below erroneously exports an application
without specifying what version of Reach it uses:

```reach
export const main = Reach.App(() => {});
```


Fix this by adding a header to the file:

```reach
"reach 0.1";

export const main = Reach.App(() => {});
```


## {#RE0049} RE0049

This error indicates that an `{!reach} object` has been given a field
that is not an identifier or a `{!reach} string`.

For example, the code below erroneously uses a dynamic string as an object key:

```reach
A.only(() => {
  const x = declassify(interact.x);
});
A.publish(x);
const o = {
  [x]: 4,
};
```


You can fix this by using a static string as the key.

## {#RE0050} RE0050

@{errver(false, "v0.1")}

This error indicates an `{!reach} Object` has an incorrect number of values
associated with a field.

## {#RE0051} RE0051

This error indicates that the field of an `{!reach} Object` uses the incorrect
syntax for defining a function.

For example, the code below declares a field as a function with the following syntax:

```reach
const o = {
  f() {
    return 1;
  }
};
```


You can fix this by using the following arrow expression syntax:

```reach
const o = {
  f: () => { return 1; }
}
```



## {#RE0052} RE0052

This error indicates that a `{!reach} UInt` has been used as the key of an
`{!reach} Object`. However, only identifiers and values of type `{!reach} Bytes`
are valid object keys.

You can fix this issue by replacing the erroneous key with a static string.

## {#RE0053} RE0053

This error indicates that you are attempting to spread a value that is not
an object. This issue is most likely caused by a typo in your program.


## {#RE0054} RE0054

This error indicates that the argument provided to `{!reach} Array.iota` is
not static. `{!reach} Array.iota` requires its argument to be computable at
compile time.

You can fix this issue by providing a static `{!reach} UInt` to the function.

## {#RE0055} RE0055

This error occurs when you provide a primitive operation with the incorrect
number of arguments or arguments of the wrong type. Please review the documentation
for the function you are attempting to use and provide it with the correct arguments.

## {#RE0056} RE0056

This error indicates that you are attempting to create a variable, although another
variable in the scope uses the same name. In Reach, identifier shadowing is
not allowed. You can fix this issue by renaming your variable or moving one of the
variable declarations to another scope where it does not conflict with the other.

## {#RE0057} RE0057

This error indicates that the compiler expected the tail of a statement block
to be empty, but it wasn't. This issue may arise if there are statements beyond
a `{!reach} return` or `{!reach} exit` statement. These statements are dead code
and you can fix this issue by deleting them.


## {#RE0058} RE0058

@{errver(false, "v0.1")}

This error indicates that you tried to use the `{!reach} publish` keyword twice
in a publication.

## {#RE0059} RE0059

@{errver(false, "v0.1")}

This error indicates that there is a function at the top level without a name.
You can fix this by naming your function.

## {#RE0060} RE0060

@{errver(false, "v0.1")}

This error indicates that there is an illegal `{!reach} while` loop `{!reach} invariant`.
You can fix this issue by providing only one expression to `{!reach} invariant`.

## {#RE0061} RE0061

@{errver(false, "v0.1")}

This error indicates that `{!reach} Participant.only` was not supplied a single thunk
as its argument.

You can fix this by providing the expected value to the function.

## {#RE0062} RE0062

@{errver(false, "v0.1")}

This error indicates that `{!reach} each` was not given a `{!reach} Tuple` of `{!reach} Participant`s
as its first argument.

You can fix this by providing the expected value to the function.

## {#RE0063} RE0063

This error indicates that a given function expects a `{!reach} Participant` or `{!reach} ParticipantClass`
as an argument, but it was given something else.

For example, the code below erroneously provides `{!reach} false` instead of a `{!reach} Participant` to
`{!reach} unknowable`:

```reach
A.only(() => {
  const _x = interact.x;
});
unknowable(false, A(_x));
```


You can fix this by passing a `{!reach} Participant` as the first argument to `{!reach} unknowable`:

```reach
A.only(() => {
  const _x = interact.x;
});
unknowable(B, A(_x));
```


## {#RE0064} RE0064

This error indicates that the program is attempting to transfer funds to a `{!reach} Participant`
that is not yet bound to an `{!reach} Address`.

For example, the code below transfers funds to `{!reach} Bob` before he has a set `{!reach} Address`:

```reach
Alice.publish().pay(100);
transfer(100).to(Bob);
```


You can fix this by using `{!reach} Participant.set` first or having `{!reach} Bob` publish before the
`{!reach} transfer`:

```reach
Bob.publish();
commit();
Alice.publish().pay(100);
transfer(100).to(Bob);
```


## {#RE0065} RE0065

This error indicates that you are attempting to `{!reach} transfer` funds to a `{!reach} ParticipantClass`.
This is not possible because `{!reach} transfer` expects a single `{!reach} Address` to transfer to.

For example, the code below erroneously attempts to transfer the `{!reach} balance` of the contract to a class:

```reach
const Alice = Participant('Alice', {});
const Bob   = ParticipantClass('Bob', {});
deploy();
Alice.publish().pay(100);
transfer(100).to(Bob);
```


You can fix this code by specifying a specific `{!reach} Address` to use. For example, the
class could `{!reach} race` to specify their own address:

```reach
const Alice = Participant('Alice', {});
const Bob   = ParticipantClass('Bob', {});
deploy();
Alice.publish().pay(100);
commit();
Bob.only(() => {
  const b = this;
});
Bob.publish(b);
transfer(100).to(b);
commit();
```


## {#RE0066} RE0066

This error indicates that the state of the program differs in the continuation of a
branching statement. That is, if a Reach program may execute multiple different code paths at
runtime, the continuation of those branches must make the same assumption about state.

For example, this error may be caused by having one branch end in consensus step and
the other in a step. You can fix this by ensuring both branches end in the same mode.

Another example is a `{!reach} Participant` makes their first publication in the branch
of a conditional. You can fix this by having the `{!reach} Participant` make their first
publication before the conditional statement.

## {#RE0067} RE0067

This error indicates that you are attempting to bind a secret value to an identifier
of the wrong format. secret identifiers must be prefixed with `{!reach} _`.

For example, the code below erroneously assigns a secret value to a public identifier, `{!reach} x`:

```reach
A.only(() => {
  const x = interact.x;
});
```


You can fix this by either changing the identifier to start with `{!reach} _` or using `{!reach} declassify`
to make the value public:

```reach
A.only(() => {
  const _x = interact.x;
});
// or
A.only(() => {
  const x = declassify(interact.x);
});
```


## {#RE0068} RE0068

This error indicates that you are attempting to bind a public value to an identifier
of the wrong format. public identifiers cannot be prefixed with `{!reach} _`.

For example, the code below erroneously assigns a public value to a secret identifier, `{!reach} _x`:

```reach
const _x = 1;
```


You can fix this by removing the `{!reach} _` prefix:

```reach
const x = 1;
```


## {#RE0069} RE0069

This error indicates that you are attempting to read the value of `{!reach} _`. Any binding to `{!reach} _` is
ignored and therefore cannot be read from.

You can fix this by using another identifier and referencing it as usual.

## {#RE0070} RE0070

This error indicates that you are attempting to spread a value as if it were
`{!reach} Tuple`, `{!reach} Array`, or `{!reach} Struct`, but it is not. This issue
is likely caused by a typo in your code.

For example, the code below erroneously spreads the wrong values:

```reach
const xi = 1;
const xa = [2, 3];
add(1, ...xi);
```


You can fix this code by spreading a tuple-like value for the second argument of `{!reach} add`:

```reach
const xi = 1;
const xa = [2, 3];
add(1, ...xa);
```


## {#RE0071} RE0071

This error indicates that the two `{!reach} Array`s given to `{!reach} Array.zip` are not of
equal length. You can fix this error by providing two `{!reach} Array`s of equal length to
the function.

## {#RE0072} RE0072

This error indicates that a `{!reach} switch` statement was supplied with a value that is not a
`{!reach} Data` instance.

For example, the code below expects a `{!reach} Maybe` type, but is erroneously provided with a `{!reach} UInt`:

```reach
const f = (mx) => {
  switch (mx) {
    case Some: { return mx; }
    case None: { return 0; }
  };
};

f(1);
```


You can fix this code by providing a value with the correct `{!reach} Type` to the `{!reach} switch` statement:

```reach
const f = (mx) => {
  switch (mx) {
    case Some: { return mx; }
    case None: { return 0; }
  };
};

f(Maybe(UInt).Some(1));
```


## {#RE0073} RE0073

This error indicates that there are multiple cases for the same variant in a `{!reach} switch` statement or
`{!reach} match` expression.

You can fix this error by deleting one of the branches, ensuring there is only one branch per variant.

## {#RE0074} RE0074

This error indicates that a `{!reach} switch` statement or `{!reach} match` expression does not have a case
for every variant of a `{!reach} Data` instance.

You can fix this issue by adding the missing cases listed
in the error message.

## {#RE0075} RE0075

This error indicates that a `{!reach} switch` statement or `{!reach} match` expression contains cases
for unknown variants. These erroneous variants are not listed in the `{!reach} Data` definition.

You can fix this issue by adding the unknown variant to the `{!reach} Data` definition or removing the case.

## {#RE0076} RE0076

This error indicates that the `{!reach} Type` of a value you provided to a function or operation does
not match the expected `{!reach} Type`.

For example, the code below erroneously provides a number as the second argument to `{!reach} assert`:

```reach
assert(2 == 2, 5);
```


However, the second argument of `{!reach} assert` is expected to be of type `{!reach} Bytes`.
You can fix this issue by providing a value of the correct type:

```reach
assert(2 == 2, "5th assertion")
```


## {#RE0077} RE0077

This error indicates that the depth of recursion for a function call exceeded the limit allowed.
This issue may indicate that the recursive function does not have a base case.

You can fix this issue by re-writing your recursive function into an iterative set of
statements, e.g. `{!reach} while` loop.

## {#RE0078} RE0078

This error indicates that the program is no longer live by the time it reaches a publication.
That is, the program will have already `{!reach} exit`ed before the given point.

For example, the code below will always `{!reach} exit` before calling `{!reach} publish`:

```reach
const f = () => { exit(); };
f();
Alice.publish();
commit();
```


You can fix this code by wrapping the `{!reach} exit` in a conditional:

```reach
const f = () => { exit(); };
if (/* ... */) {
  f();
}
Alice.publish();
commit();
```


## {#RE0079} RE0079

@{errver(false, "v0.1")}

This error indicates that a statement is being used in place of an expression.
Refer to the documentation for the statement you are attempting to use for more
information on how to use it.

## {#RE0080} RE0080

This error indicates that there is an attempt to conditionally transition to consensus
without a `{!reach} timeout`. When making a conditional publication, such as `{!reach} A.publish(x).when(shouldPublish)`,
there needs to be a timeout associated with the publication if `{!reach} shouldPublish` is not statically `{!reach} true`.

In `{!reach} parallelReduce` or `{!reach} fork`, a `{!reach} timeout` is required unless one `{!reach} Participant`
always races, the `{!reach} when` field in their `PUBLISH_EXPR` is statically `{!reach} true`, or if one
`{!reach} ParticipantClass` will attempt to race.

For example, the code below erroneously attempts to publish a value if a certain condition holds:

```reach
A.only(() => {
  const { x, shouldPublish } = declassify(interact.getParams());
});
A.publish(x)
 .when(shouldPublish);
commit();
```


You can fix this issue by providing a `{!reach} timeout` case for

```reach
A.only(() => {
  const { x, shouldPublish, deadline } = declassify(interact.getParams());
});
A.publish(x)
 .when(shouldPublish)
 .timeout(deadline, () => closeTo(Bob));
commit();
```


## {#RE0081} RE0081

This error indicates that the result of `PUBLISH_EXPR` for a `{!reach} fork` or `{!reach} parallelReduce`
is not of the right `{!reach} Type`. It is expected to be an `{!reach} Object` with a `{!reach} when` field,
and optionally a `{!reach} msg` field.

For example, the code below erroneously tries to publish a value in a `{!reach} parallelReduce` case:

```reach
parallelReduce(/* ... */)
  // ...
  .case(Alice,
    (() => {
      const x = declassify(interact.x);
      return x;
    })
  // ...
  )
```


This code can be fixed by using an `{!reach} Object` and assigning the value to be published to
the `{!reach} msg` field of the object:

```reach
parallelReduce(/* ... */)
  // ...
  .case(Alice,
    (() => {
      const x = declassify(interact.x);
      return {
        msg: x;
      }
    })
  // ...
  )
```


## {#RE0082} RE0082

This error indicates that the parameters of a `CONSENSUS_EXPR` in a `{!reach} fork` or
`{!reach} parallelReduce` are incorrect. The function provided should either accept zero
parameters or one parameter, which represents the `{!reach} msg` of the `{!reach} PUBLISH_EXPR`.

For example, the code below erroneously tries to publish multiple values and bind them in
the function provided to `CONSENSUS_EXPR`:

```reach
parallelReduce(/* ... */)
  // ...
  .case(Alice,
    (() => ({
      msg: [declassify(interact.x), declassify(interact.y)];
      when: declassify(interact.shouldGo())
    })),
    ((x, y) => {
      // ...
    })
  )
```


You can fix this code by changing the arrow expression to accept one parameter. You can
either destructure the argument with a `{!reach} const` assignment or as part of the function
syntax:

```reach
parallelReduce(/* ... */)
  // ...
  .case(Alice,
    (() => ({
      msg: [declassify(interact.x), declassify(interact.y)];
      when: declassify(interact.shouldGo())
    })),
    (([ x, y ]) => {
      // ...
    })
  )
```


## {#RE0083} RE0083

This error indicates that not all the components of the `{!reach} parallelReduce` statement are provided.
Please refer to the documentation of `{!reach} parallelReduce` to see the required components.

You can fix this error by adding any components the compiler has listed.

## {#RE0084} RE0084

This error indicates that you have provided the wrong number of arguments to a component of
`{!reach} parallelReduce`. Please refer to the documentation for the specific component you
are trying to use.

For example, the code below erroneously supplies a closure as the second argument to `{!reach} timeRemaining`.

```reach
parallelReduce([ 0 ])
  .invariant(balance() == balance())
  .while(true)
  .case(A,
    (() => { when: true }),
    (() => {
      return [ x + 1]
    })
  )
  .timeRemaining(1, () => {});
```


However, `{!reach} timeRemaining` is a shorthand for a timeout which automatically publishes and returns the
`{!reach} parallelReduce` accumulator. The component only expects one argument. You can fix this code by removing
the second argument supplied.

## {#RE0085} RE0085

This error indicates that your program would contain a value at runtime which would not be allowed. This
error usually stems from not fully applying a primitive function or using a value incorrectly, such
as the participant interact interface of a `{!reach} Participant`.

For example, the code below erroneously tries to publish `{!reach} Alice`'s interact interface:

```reach
Alice.only(() => {
  const aInteract = declassify(interact);
});
Alice.publish(aInteract);
```


You can fix this code by specifying a specific field of `{!reach} Alice`'s interact interface to `{!reach} publish`:

```reach
Alice.only(() => {
  const aX = declassify(interact.x);
});
Alice.publish(aX);
```


## {#RE0086} RE0086

This error indicates that the `{!reach} Type` of a value cannot exist at runtime. This error
may be caused by a `{!reach} Fun` in a participant interact interface having a return
type of another `{!reach} Fun`.

For examples of this error and how to fix it, see @{seclink("RE0012")}.

## {#RE0087} RE0087

@{errver(false, "v0.1")}

This error indicates that you are attempting to apply a non-function value as if it were a function. This
issue is most likely caused by a typo with an identifier.

## {#RE0088} RE0088

This error indicates that there is a mismatch between the actual `{!reach} Type` of a value and the expected
`{!reach} Type` of a value.

For example, the code below erroneously returns a `{!reach} Bool` when the type annotation states that
the function should return a `{!reach} UInt`.

```reach
export const f =
  is(((x) => true),
     Fun([UInt], UInt));
```


You can fix this code by returning a `{!reach} UInt` from the function or changing the return type of the function.

This error may be caused by using a value of the incorrect type in an operation. The code below erroneously uses
a `{!reach} Maybe` value in a `{!reach} +` expression:

```reach
A.only(() => {
  const mi = declassify(interact.get1());
  const i = (() => {
    switch (mi) {
    case None: return 42;
    default: return mi+1; } })(); });
```


In this code, `{!reach} mi` is still of `{!reach} Maybe` type. You can fix this code by changing `{!reach} default`
to `{!reach} case Some`, which will re-bind `{!reach} mi` to the value contained within `{!reach} Some`:

```reach
A.only(() => {
  const mi = declassify(interact.get1());
  const i = (() => {
    switch (mi) {
    case None: return 42;
    case Some: return mi+1; } })(); });
```


## {#RE0089} RE0089

This error indicates that a `{!reach} Map.reduce` is being performed outside of an `{!reach} invariant`, which
is the only place map reductions are allowed to occur.

For example, the code below erroneously attempts to keep the sum of the `{!reach} Map` as a loop variable:

```reach
var [keepGoing, sum] = [true, m.sum()];
invariant(balance() == sum);
while (keepGoing) {
  commit();

  Alice.pay(1);
  m[Alice] = fromSome(m[Alice], 0) + 1;

  [keepGoing, sum ] = [true,  m.sum()];
  continue;
}
```


You can fix this code by moving any `{!reach} Map` reductions to inside the `{!reach} invariant`:

```reach
var keepGoing = true;
invariant(balance() == m.sum());
while (keepGoing) {
  commit();

  Alice.pay(1);
  m[Alice] = fromSome(m[Alice], 0) + 1;

  keepGoing = true;
  continue;
}
```


## {#RE0090} RE0090

This error indicates that a `{!reach} Map` was expected in an expression, but a value
of a different type was provided. This issue is most likely caused by a typo in an
identifier.

## {#RE0091} RE0091

This error indicates that you are attempting to create a `{!reach} Foldable` value, which is
not possible. `{!reach} Foldable` is an interface that `{!reach} Array` and `{!reach} Map` implement.

For example, the code below erroneously tries to create a `{!reach} Foldable` value:

```reach
const container = Foldable();
```


You can fix this code by instead creating a `{!reach} Map` or an `{!reach} Array`.

## {#RE0092} RE0092

This error indicates that there are normal parameters listed after parameters with default arguments
in a function definition. Parameters with default arguments must come after all other arguments.

For example, the code below erroneously lists its parameters:

```reach
const f = (name = "Reach", msg) => {
  // ...
}
```


You can fix this error by rearranging the parameters so that the ones with default arguments are last:

```reach
const f = (msg, name = "Reach") => {
  // ...
}
```


## {#RE0093} RE0093

This error indicates that you are attempting to bind an effect or statement, which is not allowed.

For example, the code below supplies a statement as an argument to a function:

```reach
closeTo(Bob,
  each([Alice, Bob], () => {
    interact.showResult(5); }));
```


The result of `{!reach} each` cannot be bound as a function argument. You can fix this code by
wrapping the statement in an arrow expression:

```reach
closeTo(Bob, () => {
  each([Alice, Bob], () => {
    interact.showResult(5); })});
```


## {#RE0094} RE0094

This error indicates that there are unused variables in your program. This error will
only occur with `{!reach} 'use strict'`.

You can fix this error by either replacing the unused variable names with `{!reach} _` or
subsequently using `{!reach} void(x)`.

## {#RE0095} RE0095

This error indicates that a field in a `{!reach} Remote` object is not a function. You
can fix this by ensuring your `{!reach} Remote` object only contains fields that are functions.
This fix may require changes to the foreign contract you are attempting to connect to.

## {#RE0096} RE0096

This error indicates that the key supplied to a `{!reach} Struct` does not match the required regex.
`{!reach} Struct` keys must satisfy the regex: `[_a-zA-Z][_a-zA-Z0-9]*`.

For example, the code below provides an erroneous key value:

```reach
const s = Struct([["$x ", UInt]]);
```


You can fix this by removing any illegal characters:

```reach
const s = Struct([["x", UInt]]);
```


## {#RE0097} RE0097

This error indicates that a key in a `{!reach} Struct` has been used more than once.
Every key must be unique in a `{!reach} Struct`.

For example, the code below erroneously uses the same key twice:

```reach
const s = Struct([["x", UInt], ["y", UInt], ["x", UInt]]);
```


You can fix this by renaming one of the `{!reach} "x"` fields:

```reach
const s = Struct([["x", UInt], ["y", UInt], ["x2", UInt]]);
```


## {#RE0098} RE0098

This error indicates that you are attempting to export a name that the
Reach backend already produces. For example, the names provided in `{!reach} Participant`,
`{!reach} ParticipantClass`, and `{!reach} View` will be exported by the Reach backend.

Reach exports a few names from the backend automatically, such as `{!reach} getExports`.
Therefore, you cannot export a `{!reach} Participant` named `{!reach} getExports` as such:

```reach
const P = Participant('getExports', {});
```


You can fix this error by choosing a different name.

## {#RE0099} RE0099

This error indicates that you are attempting to use a value that is not a `{!reach} Bool`
in a condition, while using strict mode.

For example, the code below erroneously uses a number as the condition to `{!reach} if`:

```reach
const y = declassify(interact.getInt());
const x = y ? 2 : 3;
```


You can fix this code by using a `{!reach} Bool` instead. The following code will consider
any number that is not `{!reach} 0` `{!reach} true`:

```reach
const y = declassify(interact.getInt());
const x = (y != 0) ? 2 : 3;
```


## {#RE0100} RE0100

This error indicates that there are multiple `{!reach} throw` statements inside a `{!reach} try`
block and the values thrown are of different `{!reach} Type`s.

You can fix this error by ensuring that every value thrown is of the same type. It may be necessary
to create a new `{!reach} Data` instance that can handle different types.

For example, the code below erroneously throws a `{!reach} UInt` and a `{!reach} Bool`:

```reach
Alice.only(() => {
  const transferAll = declassify(interact.transferAll);
});
Alice.publish(transferAll);

try {
  if (transferAll) {
    throw true;
  } else {
    throw 1;
  }
} catch (e) {
  if (e == true) {
    transfer(balance()).to(Alice);
  } else {
    transfer(e).to(Alice);
  }
}
```


You can fix this code by abstracting the `{!reach} Type`s of values thrown into a new `{!reach} Data` type:

```reach
const TransferType = Data({
  CERTAIN_AMT: UInt,
  TRANSFER_ALL: Null
});

Alice.only(() => {
  const transferAll = declassify(interact.transferAll);
});
Alice.publish(transferAll);

try {
  if (transferAll) {
    throw TransferType.TRANSFER_ALL();
  } else {
    throw TransferType.CERTAIN_AMT(1);
  }
} catch (e) {
  switch (e) {
    case CERTAIN_AMT: {
      transfer(e).to(Alice);
    }
    case TRANSFER_ALL: {
      transfer(balance()).to(Alice);
    }
  }
}
```


## {#RE0101} RE0101

This error occurs when you attempt to use a `{!reach} throw` statement outside of a `{!reach} try`
block.

You can fix this error by moving your `{!reach} throw` statement inside the appropriate block of code
or wrapping the necessary code into a `{!reach} try/catch` block.

## {#RE0102} RE0102

This error indicates that you are attempting to `{!reach} pay` on the first publication.
This is not possible, because the contract will not yet exist, and receiving tokens depends on knowing the address of a contract first on those networks.

You can fix this by paying into the contract after the first publication.

## {#RE0103} RE0103

This error indicates that you are attempting to `{!reach} publish` a `{!reach} Token` within
a `{!reach} while` loop. This is not currently possible in Reach. You must publish `{!reach} Token`
values outside of loops.

For example, the code below erroneously publishes a `{!reach} Token` inside a loop:

```reach
var [] = [];
invariant(balance() == balance());
while ( true ) {
  commit();
  A.only(() => {
    const [tok, amt] = declassify(interact.get()); });
  A.publish(tok, amt)
    .pay([amt, [amt, tok]]);
  continue;
}
```


You can fix this code by publishing `{!reach} tok` before the loop:

```reach
A.only(() => {
  const [tok, amt] = declassify(interact.get()); });
A.publish(tok, amt);

var rounds = 0;
invariant(balance() == rounds * amt && balance(tok) == rounds * amt);
while ( true ) {
  commit();

  A.pay([amt, [amt, tok]]);

  rounds = rounds + 1;
  continue;
}
```


## {#RE0104} RE0104

This error indicates that you are attempting to reference a `{!reach} Token` that
was computed dynamically. Reach does not yet support this.

For example, the code below attempts to transfer the balance of an `{!reach} array` of `{!reach} Token`s
to a `{!reach} Participant`:

```reach
const allTokens = array(Token, toks);
Foldable_forEach(allTokens, (tok) => transfer(balance(tok), tok).to(Who));
```


You can work around this issue by writing out the `{!reach} Token` values explicitly:

```reach
const nonNetPayAmt = [ [balance(tok), tok], [balance(tok2), tok2] ];
transfer([ balance(), ...nonNetPayAmt ]).to(Who);
```


## {#RE0105} RE0105

This error indicates that the incorrect arguments were supplied to `{!reach} withBill`.
`{!reach} withBill` either expects zero arguments, when only receiving network tokens,
or a `{!reach} Tuple` of `{!reach} Token`s when receiving non-network tokens.

For example, the code below erroneously provides multiple non-network tokens to
`{!reach} withBill`:

```reach
const [ returned, [gilRecv, zmdRecv], randomValue ] =
  randomOracle.getRandom.pay(stipend).withBill(gil, zmd)();
```


You can fix this by wrapping all the arguments into a single `{!reach} Tuple`:

```reach
const [ returned, [gilRecv, zmdRecv], randomValue ] =
  randomOracle.getRandom.pay(stipend).withBill([gil, zmd])();
```


## {#RE0106} RE0106

This error indicates that a program declared multiple `{!reach} View`s with the same
name.

You can fix this error by renaming the duplicate `{!reach} View`s, ensuring that every name is unique.

## {#RE0107} RE0107

@{errver(false, "v0.1")}

This error indicates that the value of a `{!reach} View` cannot be exposed. This would
only occur if the value cannot be represented at runtime.

## {#RE0108} RE0108

This error indicates that a `{!reach} View` function has an unconstrained domain. Every
`{!reach} View` must explicitly state the `{!reach} Type` of function arguments it accepts.

If your `{!reach} View` function relies on a varying number of arguments or `{!reach} Type`s, you
can either abstract the arguments into a new `{!reach} Data` type or make separate `{!reach} View`s.

## {#RE0109} RE0109

This error indicates that there are multiple `{!reach} Participant`s or `{!reach} ParticipantClass`es
with the same name. Each participant name must be unique.

You can fix this error by renaming the duplicate names.

## {#RE0110} RE0110

This error indicates that a `{!reach} Struct` contains an invalid field name.
A field name may be invalid if it is a reserved word in the connector you are targeting.

For example, the code below erroneously uses the field name `{!reach} "super"`, which is
reserved in Solidity:

```reach
const A = Participant('A', {
  get: Fun([], Struct([
    ['super', Address]
  ]))
});
```


You can fix this by renaming the erroneous field names:

```reach
const A = Participant('A', {
  get: Fun([], Struct([
    ['super1', Address]
  ]))
});
```


## {#RE0111} RE0111

This error indicates that an unexpected key was provided to the `{!reach} Token` constructor.
You may find the acceptable parameters in the following section: token minting.

## {#RE0112} RE0112

This error indicates that you are attempting to perform an invalid operation on a `{!reach} Token`.
Some `{!reach} Token` methods such as `{!reach} destroy`, `{!reach} burn`, and
`{!reach} supply` are only valid for tokens that were created in your program.

You can fix this by removing the erroneous statement.

## {#RE0113} RE0113

This error indicates that you provided an incorrect value to the `{!reach} .define` component of a
`{!reach} parallelReduce` statement. The argument to `{!reach} .define` should be of the form: `{!reach} () => DEFINE_BLOCK`.
Please review the `{!reach} parallelReduce` documentation for information on how `{!reach} .define` works.

## {#RE0114} RE0114

This error indicates that you provided an incorrect value to a function.
The function expected to receive a `{!reach} Type`, but received something else.
This issue can arise when a `{!reach} Type` constructor does not have any arguments applied to it.

For example, the code below erroneously creates an `{!reach} Object` type with a field `{!reach} name`:

```reach
const Person = Object({
  name: Bytes
});
```


This code is incorrect because `{!reach} Bytes` is not a type; it is a function that accepts a `{!reach} UInt` and returns
a `{!reach} Type`. This code can be fixed by providing an argument to `{!reach} Bytes` that represents the length:

```reach
const Person = Object({
  name: Bytes(32)
});
```


For more information about data types, visit @{seclink("ref-programs-types")}.

## {#RE0115} RE0115

This error indicates that a time argument's type is not known at compile-time.

For example, if `{!reach} x` is not known at compile-time, then

```reach
wait(x ? relativeTime(10) : relativeSecs(10));
```


results in this error.

## {#RE0116} RE0116

This error means that a `{!reach} return` statement, typically inside of an `{!reach} if` statement, does not occur in tail position.

For example, this function would have this error:

```reach
const f = (x) => {
  if ( x > 20 ) {
    return 0;
  } else {
    return 1;
  }
  return 2;
};
```


The third `{!reach} return` can never be reached, so the way to correct the program is to remove it.

## {#RE0117} RE0117

This error means that only one branch of a conditional (`{!reach} if` or `{!reach} switch`) contains a `{!reach} return` statement.

For example, this function would have this error:

```reach
const f = (x) => {
  if ( x > 20 ) {
    return 0;
  }
  return 1;
};
```


It should be corrected by moving the tail of the `{!reach} if` into the `{!reach} else` branch:

```reach
const f = (x) => {
  if ( x > 20 ) {
    return 0;
  } else {
    return 1;
  }
};
```


## {#RE0118} RE0118

This error indicates that a switch case is unreachable.
This issue will occur when a `{!reach} case` is listed after `{!reach} default`.

For example, the code below erroneously puts a `{!reach} case` after `{!reach} default`:

```reach
Maybe(UInt).Some(5).match({
  default: (() => 0),
  Some: ((i) => i),
});
```


This error can be corrected by either removing the `{!reach} Some` case or placing it before the `{!reach} default` case:

```reach
Maybe(UInt).Some(5).match({
  Some: ((i) => i),
  default: (() => 0),
});
```


## {#RE0119} RE0119

This error indicates that you have inspected the details about a publication, such as via `{!reach} didPublish()`, before there has been a publication.
This is impossible, so the expression must be moved after the first publication.

## {#RE0120} RE0120

This error indicates that an actor who is not a `{!reach} Participant`, e.g. a `{!reach} ParticipantClass`, is
attempting to make the first publication of a Reach program.

You can fix this error by assigning the first publication to one of your `{!reach} Participant`s.
Additionally, you can create a new `{!reach} Participant` to specifically perform this action.

```reach
const Constructor = Participant('Constructor', {});
// ...
deploy();
Constructor.publish();
commit();
// ...
```


## {#RE0121} RE0121

This error indicates that one of an API's interface members is not a function.
For example:

```reach
const A = API('api', {
  tastiness: UInt,
});
```


## {#RE0122} RE0122

This error indicates that the left-hand side of a ```reach
call
```
 assignment is not a pair of the domain and a function to return a result to the function.
For example:

```reach
const x = call(Voter.vote);
```


## {#RE0123} RE0123

This error indicates that the name provided to a `{!reach} Participant`, `{!reach} ParticipantClass`, `{!reach} API`, or `{!reach} View` is already in use.
There is a single namespace for all of these entities.

For example, the code below erroneously uses the same name multiple times:

```reach
const A = Participant('Flower_girl', {});
const B = API('Flower', { girl: Fun([UInt], Null) });
```


`{!reach} 'Flower_girl'` is used multiple times because every method of an `{!reach} API` will
introduce a binding, of the format: `<API name>_<method name>`, into the namespace.

You can fix this error by using different names:

```reach
const A = Participant('Flower_girl', {});
const B = API('Flower', { girl2: Fun([UInt], Null) });
```


## {#RE0124} RE0124

This error indicates that there is an attempt to make a publication in your program, but there are
no `{!reach} Participant`s or `{!reach} ParticipantClass`es declared.

This issue can arise when you use `{!reach} Anybody.publish()`. To fix this issue, ensure you declare
a `{!reach} Participant` or `{!reach} ParticipantClass`.

## {#RE0125} RE0125

This error indicates that an `{!reach} API` is explicitly attempting to make a publication, e.g. `{!reach} api.publish()`.
An API may only make a publication through a `{!reach} fork`, `{!reach} parallelReduce`, or `{!reach} call`.

Depending on your program, you can fix this error by performing a `{!reach} call` or adding an `{!reach} .api`
case to your `{!reach} fork` or `{!reach} parallelReduce` statement.


## {#REP0000} REP0000

This error indicates that the body of a `{!reach} while` loop does not make a publication before the `{!reach} continue`
statement.

For example, the code below does not make any publications before continuing the loop:

```reach
var x = 0;
invariant(balance() == 0);
while (true) {
  x = x + 1;
  continue;
}
```


You can fix this code by making a publication within the `{!reach} loop`:

```reach
var x = 0;
invariant(balance() == 0);
while (true) {
  commit();
  Alice.publish();
  x = x + 1;
  continue;
}
```


Note that the body of a `{!reach} while` starts in a consensus step so you must first `{!reach} commit` before making a publication.

## {#REP0001} REP0001

This error indicates that a `{!reach} View` is set, but never [dominates](https://en.wikipedia.org/wiki/Dominator_(graph_theory)) any `{!reach} commit`s.
This means the value the `{!reach} View` is set to will never be observable.

For example, the code below attempts to set a loop variable as the value of a `{!reach} View`:

```reach
export const main = Reach.App(() => {
  const A = Participant('Alice', {
    observe: Fun([], Null)
  });
  const I = View('I', { i: UInt });
  deploy();

  A.publish();

  var [ i ] = [0];
  { }
  invariant (balance() == 0);
  while ( i < 5 ) {
    commit();

    A.interact.observe();
    A.publish();

    I.i.set(i);

    i = i + 1;
    continue;
  }

  commit();
});
```


The effect of `{!reach} I.i.set(i)` is only observable after the next `{!reach} commit` in its scope.
Since, there are no `{!reach} commit`s between `{!reach} I.i.set(i)` and `{!reach} continue`, which is the end of the lexical scope, there is no
way to observe the effect of setting `{!reach} I.i`.

You can generally fix this error by inserting a `{!reach} commit` in the area where you'd like
the effect of setting a `{!reach} View` to be observable. In the case of a `{!reach} while` loop, like the
program above, it can be fixed the following way:

```reach
export const main = Reach.App(() => {
  const A = Participant('Alice', {
    observe: Fun([], Null)
  });
  const I = View('I', { i: UInt });
  deploy();

  A.publish();

  var [ i ] = [0];
  {
    I.i.set(i);
  }
  invariant (balance() == 0);
  while ( i < 5 ) {
    commit();

    A.interact.observe();
    A.publish();

    i = i + 1;
    continue;
  }

  commit();
});
```


This change will ensure the `{!reach} View` `{!reach} I.i` is set to `{!reach} i` on every iteration of the
loop. Additionally, the continuation of the loop will have `{!reach} I.i` set to the last value of
the loop variable `{!reach} i`.

## {#RI0000} RI0000

This error indicates that `git clone` has failed when trying to download the dependencies
of your project. This error will tell you the issue that was encountered.

## {#RI0001} RI0001

This error indicates that `git checkout` has failed when trying to checkout the specific
revision of your dependency. This error will tell you the issue that was encountered.

## {#RI0002} RI0002

This error indicates that the dependency required by your project does not contain either
the branch specified, or a `master/main` branch.

Please ensure you have specified the correct import.

## {#RI0003} RI0003

This error indicates that your project dependencies need to be retrieved but you did not specify
`{!reach} --install-pkgs` with your `reach` command.

You can fix this by specifying the needed flag with your command.

## {#RI0004} RI0004

This error indicates that the syntax you used to specify your import is incorrect.

You can fix this by using the correct syntax. Please view the documentation for package imports.

## {#RL0000} RL0000

This error indicates that the given code must not be reachable because it would
result in an error if reached. This error may be caused for different reasons,
which will be explained if encountered.

One reason this code could be encountered is if there is a branch within a `{!reach} while`
loop, which does not contain a `{!reach} continue` statement when it is expected.
You can fix this by explicitly adding the `{!reach} continue` statement to the erroneous block
of code.

## {#RP0000} RP0000

This error indicates that there is a [circular dependency](https://en.wikipedia.org/wiki/Circular_dependency) in the `{!reach} import`s of your application.

You can fix this by refactoring your code to remove the cyclic imports.

## {#RP0001} RP0001

@{errver(false, "v0.1")}

This error indicates that you have specified a function without an argument list.

You can fix this by adding an argument list.

## {#RP0002} RP0002

@{errver(false, "v0.1")}

This error indicates that an identifier was expected during parsing, but an expression
was received.

## {#RP0003} RP0003

This error indicates that a key or a key/value pair was expected in a
destructuring assignment, but an object method was received.

For example, the code below creates a method within a destructuring assignment:

```reach
const {x() { return 1 }} = {x: 2};
```


You can fix this code by simply specifying `{!reach} x` in the assignment:

```reach
const { x } = {x: 2};
```


## {#RP0004} RP0004

This error indicates that an unsupported binary operator was encountered.
Reach is a subset of JavaScript and does not support all of the binary operators
JavaScript supports.

You can fix this by utilizing different operators or functions depending
on the logic of your program.

## {#RP0005} RP0005

@{errver(false, "v0.1")}

This error indicates that an unsupported literal was encountered.
Reach is a subset of JavaScript and does not support all of the literals that
JavaScript supports.

## {#RP0006} RP0006

This error indicates that an unsupported unary operator was encountered.
Reach is a subset of JavaScript and does not support all of the unary operators
JavaScript supports.

You can fix this by utilizing different operators or functions depending
on the logic of your program.

## {#RP0007} RP0007

This error indicates that you are attempting to `{!reach} import` a file using an absolute
path which is not supported.

You can fix this by using a relative path for your `{!reach} import`.

## {#RP0008} RP0008

This error indicates that you are trying to `{!reach} import` a path
that is accessing its parent directory via `{!reach} ..`. This type of
import is not allowed. Please view the documentation for package imports.

For example, the code below erroneously `{!reach} import`s a file from its parent
directory:

```reach
"reach 0.1";
import "../a.rsh";
```


You can fix this error by moving your file, `{!reach} "../a.rsh"`, to the same
directory your program is in. Then, reference it using a relative import:

```reach
"reach 0.1";
import "./a.rsh";
```


## {#RP0009} RP0009

@{errver(false, "v0.1")}

This error indicates that the Reach file could not be parsed as a module.

## {#RP0010} RP0010

This error indicates that a call-like expression was expected, but another
value was provided.

For example, the code below erroneously passes `{!reach} _x`, a secret value of
`{!reach} Bob`, to `{!reach} unknowable`:

```reach
unknowable(A, _x);
```


You can fix this by providing a call-like expression to the function:

```reach
unknowable(A, B(_x));
```


## {#RP0011} RP0011

@{errver(false, "v0.1")}

This error indicates that Reach expected to parse an identifier, but none was given.

You can fix this error by adding an identifier name to the erroneous location.

## {#RX0000} RX0000

This error indicates that you are trying to inspect or use the value produced from `{!reach} forall`
outside of an `{!reach} assert`.

For example, the code below attempts to verify that all `{!reach} UInt`s are greater than or
equal to zero via a `{!reach} require`:

```reach
const x = forall(UInt);
require(x >= 0);
```


This is invalid because the result of `{!reach} forall` is an abstract value, which cannot exist
at runtime. You can fix this code by verifying the claim via an `{!reach} assert`:

```reach
const x = forall(UInt);
assert(x >= 0);
```


## {#RAPI0000} RAPI0000

This error means that you defined an API but did not actually use it in your prorgam.

## {#RAPI0001} RAPI0001

This error means that you returned the result to an API without calling it.
This is generally not possible unless you directly use the internal representation of APIs.

## {#RAPI0002} RAPI0002

The error means that you use an API in two places in your program, which is not allowed.

This might look like the following in the `{!reach} API_CONSENSUS_EXPR`:
```reach
.api(User.f, (x, ret) => {
  if (x > 5) {
    ret(true);
  }
  ret(false);
})
```


You cannot return from an API call twice.

Sometimes the second instance is a by-product of an effect duplicating a continuation, such as:
```reach
.api(User.f, (x, ret) => {
  if (x > 5) {
    m[this] = x;
  }
  ret(false);
})
```

This is because this is equivalent to:
```reach
.api(User.f, (x, ret) => {
  if (x > 5) {
    m[this] = x;
    ret(false);
  } else {
    ret(false);
  }
})
```

Instead, the effect should happen after the return:
```reach
.api(User.f, (x, ret) => {
  ret(false);
  if (x > 5) {
    m[this] = x;
  }
})
```


## {#RAPI0003} RAPI0003

This error means that you did not return a result from an API call.

## {#RW0000} RW0000

This warning means the syntax or function you are trying to use is deprecated. It is still supported
by the Reach compiler, but future versions of Reach may stop supporting it.

You can fix this warning by using the new syntax or function the message suggests.

## {#RW0001} RW0001

This warning indicates there is an issue with the Solidity compiler. The message provided can
be reported to Solidity.

## {#RW0002} RW0002

This warning indicates that your program either uses a feature that is not yet supported on Algorand
or surpasses Algorand's limit on resources.

## {#RW0003} RW0003

This warning indicates your program will not run on Algorand for the listed reasons. These
reasons include a limit on the total computation cost.

## {#RW0004} RW0004

This warning indicates that your program does not contain any publications.

You can fix this issue by making sure at least one `{!reach} Participant` performs a `{!reach} publish`.

## {#RW0005} RW0005

This warning indicates that a `{!reach} View` or `{!reach} API` produces or consumes an `{!reach} Object`,
which is a type internal to Reach.
It has an opaque and unspecified representation that can only be consumed by other Reach programs, so it is probably a bad choice for general purpose interfaces.

You can fix this issue by using a `{!reach} Struct` instead of the `{!reach} Object`.

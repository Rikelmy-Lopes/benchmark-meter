# simple-benchmark

Simple-benchmark is a straightforward benchmarking tool designed for measuring the performance of algorithms.


## Usage

Install using npm:

```bash
npm i simple-benchmark -D
```

### Using with Synchronous Algorithms

To use the simple-benchmark with synchronous algorithms, follow the steps below:

```js
// Load the module using import
import { Benchmark } from 'simple-benchmark';

// Alternatively, use CommonJS syntax
const { Benchmark } = require('simple-benchmark');

// Create a new instance of the Benchmark class
const benchmark = new Benchmark();

// The add method takes three arguments:
// 1. The name of the algorithm
// 2. A callback containing the algorithm's logic
// 3. (Optional) A number specifying how many times your algorithm will be executed
benchmark.add('count to 100_000', () => {
    let sum = 0;
    for (let i = 0; i < 100_000; i += 1) {
        sum += 1;
    }
});

// The run method will execute all the added algorithms
benchmark.run().then((result) => console.log(result.get()));
```

### Using with Asynchronous Algorithms

If you plan to utilize simple-benchmark with asynchronous algorithms, follow the modified code structure below!

```js
const benchmark = new Benchmark();

// For asynchronous callbacks, you can use the async/await syntax directly
benchmark.add('promise', async () => {
    await promise();
});

// If your callback is non-async, use .then with return
benchmark.add('promise', () => {
    return promise().then();
});

// Ensure you follow this structure!
// Using other approaches may not work as expected!


benchmark.run().then((result) => console.log(result.get()));
```

### Adding Multiple Algorithms

To include more than one algorithm, you can use the add method multiple times, as demonstrated in the example below:

```js
const benchmark = new Benchmark();

// Algorithm 1: Count to 100_000
benchmark.add('count to 100_000', () => {
    let sum = 0;
    for (let i = 0; i < 100_000; i += 1) {
        sum += 1;
    }
});

// Algorithm 2: Count to 1_000_000
benchmark.add('count to 1_000_000', () => {
    let sum = 0;
    for (let i = 0; i < 1_000_000; i += 1) {
        sum += 1;
    }
});

// Algorithm 3: Asynchronous Promise
benchmark.add('promise', async () => {
    await promise();
});

// Run the benchmark and log the results
benchmark.run().then((result) => console.log(result.get()));
```

### Modifying Execution Frequency

You have the flexibility to adjust how many times your algorithms will be executed, providing a balance between precision and benchmark duration. The default execution frequency for all algorithms is set to 10 times. If you wish to customize this, follow the examples below:

#### Adjusting Frequency for All Algorithms:

```js
const config = {
    repeat: 20,
}

const benchmark = new Benchmark(config);

// Continue with the rest of your code...
```

In this case, all algorithms added to the benchmark will execute 20 times, enhancing result precision at the cost of increased benchmark duration

#### Specifying Frequency for Individual Algorithms:

```js
const config = {
    repeat: 20,
}

const benchmark = new Benchmark(config);

// Algorithm 1: Count to 100_000 (executed 20 times)
benchmark.add('count to 100_000', () => {
    let sum = 0;
    for (let i = 0; i < 100_000; i += 1) {
        sum += 1;
    }
});

// Algorithm 2: Count to 1_000_000 (executed 5 times)
benchmark.add('count to 1_000_000', () => {
    let sum = 0;
    for (let i = 0; i < 1_000_000; i += 1) {
        sum += 1;
    }
}, 5);

// Continue with the rest of your code...
```

Here, we specified different execution frequencies for individual algorithms. This allows you to fine-tune the benchmark based on the specific requirements of each algorithm
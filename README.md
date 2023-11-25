# simple-benchmark

Simple-benchmark is a straightforward benchmarking tool designed for measuring the performance of algorithms.


## Usage

Install the package using npm:

```bash
npm i simple-benchmark -D
```

### Using with Synchronous Algorithms

To use the simple-benchmark package with synchronous algorithms, follow the steps below:

```js
// Load the module using import
import { Benchmark } from 'simple-benchmark';

// Alternatively, use CommonJS syntax
const { Benchmark } = require('simple-benchmark');

// Create a new instance of the Benchmark class
const benchmark = new Benchmark();

// The add function takes two arguments:
// 1. The name of the algorithm
// 2. A callback containing the algorithm's logic
benchmark.add('count to 100_000', () => {
    let sum = 0;
    for (let i = 0; i < 100_000; i += 1) {
        sum += 1;
    }
});

// The run method will execute all the added algorithms
benchmark.run().then((result) => console.log(result.get()));
```


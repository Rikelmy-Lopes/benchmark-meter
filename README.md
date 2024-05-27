# benchmark-meter

benchmark-meter is a straightforward benchmarking tool designed for measuring the performance of algorithms.


## Usage

Install using npm:

```bash
npm i benchmark-meter -D
```

### Using with Synchronous Algorithms

To use the benchmark-meter with synchronous algorithms, follow the steps below:

```js
// Load the module using import
import { Benchmark } from 'benchmark-meter';

// Alternatively, use CommonJS syntax
const { Benchmark } = require('benchmark-meter');

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

If you plan to utilize benchmark-meter with asynchronous algorithms, follow the modified code structure below!

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

### Retrieving Benchmark Results

After running your algorithms, you will receive an instance of `DataResult`, which facilitates the display of your benchmark results.


#### Using the `get` Method

The `get` method provides the results of your benchmark in an array, following the order in which the algorithms were added:

```js
benchmark.run().then((result) => console.log(result.get()));
```

#### Using the `fastestToSlowest` Method

The `fastestToSlowest` method returns an array where the first position (index 0) corresponds to the fastest algorithm, and the last position represents the slowest algorithm:

```js
benchmark.run().then((result) => console.log(result.fastestToSlowest()));
```

#### Using the `fastest` Method

To obtain the information about the fastest algorithm, you can use the `fastest` method, which returns an object containing details about the fastest algorithm:

```js
benchmark.run().then((result) => console.log(result.fastest()));
```

#### Additional Result Retrieval Methods

In addition to the previously mentioned methods, there are two more methods that function in a similar manner:

```js
// returns an array where the first position represents the slowest algorithm, 
// and the last position corresponds to the fastest algorithm
benchmark.run().then((result) => console.log(result.slowestToFastest()));

// returns an object containing details about the slowest algorithm
benchmark.run().then((result) => console.log(result.slowest()));
```

#### Result Order Clarification

For all the methods mentioned earlier (`fastestToSlowest`, `fastest`, `slowestToFastest`, `slowest`), the results are ordered based on the average duration of execution. This sorting approach is selected because arranging results solely by the fastest or slowest execution does not offer conclusive insights.

The average duration is calculated by summing up all the execution durations and dividing that sum by the number of times the algorithm was executed. This method provides a more representative measure of performance, considering variations in execution times across multiple repetitions.

### Handling Errors in Algorithms

When your algorithm has the potential to throw an error, it's crucial to handle it appropriately. Errors thrown during the benchmark will halt the execution. Here's how you should handle errors in your algorithms:

```js
// Incorrect way: If your algorithm throws an error, it will stop the execution
benchmark.add('can throw an Error', () => {
  canThrowAnError();
});

```

```js
// Correct way: Handle errors using a try-catch block to prevent execution interruption
benchmark.add('can throw an Error', () => {
  try {
    canThrowAnError();
  } catch (error) {
    console.log(error);
  }
});

```

### Using with API Calls

It is not recommended to use our lib with APIs, especially when specifying a larger repeat option (greater than 1). This can potentially lead to HTTP Error 429 (Too Many Requests) due to an excessive number of API calls. If the API is still under development and you have control over it, then you may consider using it in such cases.

## Author

<p> <strong> Rikelmy Lopes </strong> </p>

<p> Made with ❤️ by Rikelmy Lopes! Get in touch! </p>

<div>
  <a href="https://www.linkedin.com/in/rikelmy-lopes/" target="_blank"><img-- height='30em' src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
  <a href="https://rikelmy-lopes-github-io-2foc.vercel.app" target="_blank"><img-- height='30em' src="https://img.shields.io/badge/Portfolio-%23000000.svg?style=for-the-badge&logo=firefox&logoColor=#FF7139" target="_blank"></a>
  <a href = "mailto:rikelmylopes899@gmail.com"><img height='30em' src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.instagram.com/rikelmy_lopes18/" target="_blank"><img height='30em' src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>

</div> 

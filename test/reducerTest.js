const deepFreeze = require('deep-freeze');
const assert = require('assert');
import { exportPulseData } from '../client/src/store.jsx'
var pulseData = exportPulseData; //this will need to be changed if the exports in store.jsx are changed
import { exportUsersClicks } from '../client/src/store.jsx'
var usersClicks = exportUsersClicks
/*YOUR TESTS GO IN THIS SECTION*/
//POINTERS:
// 1) place an x before a block of tests or an individual test to disable that test as pending
// 2) use deepFreeze to test purity of inputs

describe('Reducers', function() { //describe creates a header
  xdescribe('usersClicks', function() {
    var testState;

    beforeEach(function() {
      testState = {Ari: [9, 5, 6], Ross: [5], Christian: []};
      testState.length
      deepFreeze(testState);
    });
      describe('undefined parameters', function(){
        it('should return state if action.type is undefined', function(){
          assert.deepEqual(testState, usersClicks(testState, {type:'ARGLEBARGLE', user:'Ari', time: 10}) )
        });

        it('should return state if action.user is undefined', function(){
          assert.deepEqual(testState, usersClicks(testState, {type:'ARGLEBARGLE', user:'Ari', time: 10}) )
        });

        it('should return state if action.time is undefined', function(){
          assert.deepEqual(testState, usersClicks(testState, {type:'ARGLEBARGLE', user:'Ari', time: 10}) )
        });  

        it('should return a default state if state is undefined', function() {
          assert.deepEqual({}, usersClicks(undefined, {type:'ADDCLICKTOUSER', user:'Ari', time: 10}) );
        });
      })
      
      it('should add a click to a user\'s clicks array if a user is specified', function() {
        assert.equal(4, usersClicks(testState, {type:'ADDCLICKTOUSER', user:'Ari', time: 10}).Ari.length) 
      })

      it('should add a user to state on their first click', function() {
        assert.deepEqual({Ari: [10]}, usersClicks({}, {type:'ADDCLICKTOUSER', user:'Ari', time: 10}) );
      })

  })
  xdescribe('pulseData', function() { //you can nest describes to make nested groups of tests

   var testState, testStateLength

    beforeEach(function() {
    // runs before all tests in this block
      testState = [{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5}], testStateLength = testState.length
      deepFreeze(testState);
    });

    describe('UNDEFINED ACTION', function(){ //if action is undefined
      it('should return state if action is undefined', function(){
        assert.deepEqual(testState, pulseData(testState, {type: 'ARGLEBARGLE'}));
      });
    });

    describe('UNDEFINED STATE', function() {
      it('should return a default state if state is undefined', function() {
        assert.deepEqual([{x: 0, y: 0}, {x: 0, y: 1}], pulseData(undefined, {type: 'INCREMENT',time: 0}));
      });
    });

    describe('INCREMENT', function() {
      it('last value after running INCREMENT should be 1 greater than the last value before running INCREMENT', function() {
        assert.deepEqual([{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5},{x:0, y:6}], pulseData(testState, {type: 'INCREMENT',time: 0}));
      });

      it('returned array should be longer by 1 value after running INCREMENT', function() {
        assert.equal(pulseData(testState, {type: 'INCREMENT', time: 0}).length, testStateLength+1);
      });

      it('tracks different time values', function() {
        assert.deepEqual([{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5},{x:1, y:6}], pulseData(testState, {type: 'INCREMENT',time: 1}));
      });
    });

    describe('DECREMENT', function() {
      it('last value after running DECREMENT should be 1 less than the last value before running DECREMENT', function() {
        assert.deepEqual([{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5},{x: 0,y: 4}], pulseData(testState, {type: 'DECREMENT', time: 0}));
      });

      it('returned array should be longer by 1 value after running DECREMENT', function() {
        assert.equal(pulseData(testState, {type: 'DECREMENT', time: 0}).length, testStateLength+1);
      });

      it('tracks different time values', function() {
        assert.deepEqual([{x: 0,y: 1},{x: 0,y: 2},{x: 0,y: 3},{x: 0,y: 4},{x: 0,y: 5},{x:1, y:4}], pulseData(testState, {type: 'DECREMENT',time: 1}));
      });

      it('pushes 0 to array when DECREMENTING from 0', function() {
        var zeroTestState = [{x: 0,y: 0}]; deepFreeze(zeroTestState);
        assert.deepEqual([{x: 0,y: 0}, {x: 0,y: 0}], pulseData(zeroTestState, {type: 'DECREMENT', time: 0}));
      });
    });
  });
});


/*
How to Import Functions for Testing.
If you're use to using ES6 Import/Export functions, this should look familiar
1. Open the file where the function is located (in this example we will call it 'functionFile.jsx'
2. Create an export variable and set it equal to the function, for example:
    export const exportFunction = function;

3. Open your tests file
4. Import the function into your tests file, for example
    import { exportFunction } from 'functionFile.jsx'
  Note that you will need the correct path to your functionFile
5. Set that to a variable, ie.:
    var importedFunction = exportFunction;
6. You can now use it like any other function, ie.:
    importedFunction();
*/
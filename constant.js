var Class = (function() {
  // Private static attributes
  var constants = {
    UPPER_BOUND: 100,
    LOWER_BOUND: -100
  };
  // Constructor
  var ctor = function(constructorArgument) {

    }
    // Privileged static method.
  ctor.getConstant = function() {
    return contants[name];
  };
  // Retrun the constructor
  return ctor;
});

Class.getConstant('UPPER_BOUND');

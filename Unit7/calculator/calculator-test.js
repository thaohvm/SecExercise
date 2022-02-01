
it('should calculate the monthly rate correctly', function () {
  const values = { amountInit : 1100000, yearsInit : 12, rateInit : 3.1};
  expect(calculateMonthlyPayment(values)).toEqual(9157.36)
});


it("should return a result with 2 decimal places", function() {
  const values = { amountInit : 800000, yearsInit : 10, rateInit : 3.2};
  expect(calculateMonthlyPayment(values)).toEqual(7798.93)
});

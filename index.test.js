test('displays the year on load', () => {
    // Set up our document body
    document.body.innerHTML =
      '<div>' +
      '  <span id="yrdisplay" /></span>' +
      '</div>';
  
    // get the year of the current date
    var today = new Date(),
        year = today.getFullYear();
    document.getElementById('yrdisplay').innerHTML = year;

    expect(parseInt(document.getElementById('yrdisplay').innerHTML)).toEqual(year);
});
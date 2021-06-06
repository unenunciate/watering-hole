module.exports = async function() {
    let Gal = await Gallons_ERC20.deployed();
    let accounts = await web3.eth.getAccounts();
    Gal.increaseAllowance(accounts[0], 100000, {from: accounts[0]});
    let Bond = await Watering_Holes_Bond.deployed();
    Gal.transferFrom(accounts[0], Bond.address, 10000, {from: accounts[0]});     
    let Holes = await Watering_Holes.deployed();
    Bond.setWateringHoles(Holes.address, {from: accounts[0]});               
    Holes.addUser("Patrick", "https://pbs.twimg.com/profile_images/1169702872923197441/ObnSX4Ti_400x400.jpg", {from: accounts[0]});
    Holes.addWateringHole("Brockton", "Massachusetts", "United States", {from: accounts[0]});
    Holes.addPost(1, "This is a sample post", "12/25/2021", {from: accounts[0]});
    Holes.getPost(1, 1, {from: accounts[0]});
}

//dilemma swear gate uniform friend vapor gentle spoon expand opera hat sorry
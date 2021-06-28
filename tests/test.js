module.exports = async function() {
    let Gal = await Gallons_ERC20.deployed();
    let accounts = await web3.eth.getAccounts();
    Gal.increaseAllowance(accounts[0], 100000, {from: accounts[0]});
    Gal.transferFrom(accounts[0], "0x745E53935f41cAb2dD1D6D5Bd9E882214DBa5e3f", 100000, {from: accounts[0]});
    Gal.balanceOf(accounts[0], {from: accounts[0]});
    Gal.balanceOf("0x745E53935f41cAb2dD1D6D5Bd9E882214DBa5e3f", {from: accounts[0]});
    let Bond = await Watering_Holes_Bond.deployed();
    Bond.updateBond("0x745E53935f41cAb2dD1D6D5Bd9E882214DBa5e3f", 0);
    Gal.increaseAllowance(Bond.address, 100000, {from: accounts[0]});
    Gal.transferFrom(accounts[0], Bond.address, 10000, {from: accounts[0]});     
    let Holes = await Watering_Holes.deployed();           
    Holes.addUser("Patrick", "https://pbs.twimg.com/profile_images/1169702872923197441/ObnSX4Ti_400x400.jpg", 'Science', {from: accounts[0]});
    Holes.addWateringHole("Banana via Sunglasses", "", "Art", "https://pbs.twimg.com/profile_images/1169702872923197441/ObnSX4Ti_400x400.jpg", {from: accounts[0]});
    Holes.addWateringHole("Arts", "", "Art", "https://pbs.twimg.com/profile_images/1169702872923197441/ObnSX4Ti_400x400.jpg", {from: accounts[0]});
    Holes.addWateringHole("Technologies", "", "Technology", {from: accounts[0]});
    Holes.addWateringHole("Cultures", "", "Culture", "https://pbs.twimg.com/profile_images/1169702872923197441/ObnSX4Ti_400x400.jpg", {from: accounts[0]});
    Holes.addWateringHole("Sciences", "Sci", "Science", {from: accounts[0]});
    Holes.addWateringHole("Musics", "", "https://pbs.twimg.com/profile_images/1169702872923197441/ObnSX4Ti_400x400.jpg", "Music", {from: accounts[0]});
    Holes.addWateringHole("Film", "", "Film", {from: accounts[0]});
    Holes.addWateringHole("Television", "", "Television", {from: accounts[0]});
    Holes.addWateringHole("Books", "", "Books", {from: accounts[0]});
    Holes.addPost(1, "This is a sample post 2", "12/25/2021", {from: accounts[0]});
    Holes.addComment(1, 1, "This is a sample post", "12/25/2021", {from: accounts[0]});
    Holes.payPost(1, 1, 19900, {from: accounts[0]});
    Holes.getPost(1, 1, {from: accounts[0]});
    Holes.getComment(1, 1, {from: accounts[0]});
}

//dilemma swear gate uniform friend vapor gentle spoon expand opera hat sorry
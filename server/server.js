/**
 * Created by schuylermaclay on 3/5/16.
 */


Meteor.methods({
    'insertPlayerData': function (playerNameVar) {
        var currentUserId = Meteor.userId();
        PlayersList.insert({
            name: playerNameVar,
            score: 0,
            createdBy: currentUserId
        });
    },
    'removePlayerData': function (selectedPlayer) {
        var currentUserId = Meteor.userId();
        PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId});
    },
    'modifyPlayerScore': function (selectedPlayer, scoreValue) {
        var currentUserId = Meteor.userId();
        PlayersList.update({_id: selectedPlayer, createdBy: currentUserId},
            {$inc: {score: scoreValue}});
    }
});
Meteor.publish('thePlayers', function () {
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId})
});
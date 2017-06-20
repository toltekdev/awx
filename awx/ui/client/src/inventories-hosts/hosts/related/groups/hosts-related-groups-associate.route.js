export default {
    name: 'hosts.edit.groups.associate',
    squashSearchUrl: true,
    url: '/associate?inventory_id',
    ncyBreadcrumb:{
        skip:true
    },
    views: {
        'modal@hosts.edit': {
            templateProvider: function() {
                return `<associate-groups save-function="associateGroups(selectedItems)"></associate-groups>`;
            },
            controller: function($scope, $q, GroupsService, $state){
                $scope.associateGroups = function(selectedItems){
                    var deferred = $q.defer();
                    return $q.all( _.map(selectedItems, (id) => GroupsService.associateHost({id: parseInt($state.params.host_id)}, id)) )
                         .then( () =>{
                             deferred.resolve();
                         }, (error) => {
                             deferred.reject(error);
                         });
                };
            }
        }
    },
    onExit: function($state) {
        if ($state.transition) {
            $('#associate-groups-modal').modal('hide');
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
        }
    },
};

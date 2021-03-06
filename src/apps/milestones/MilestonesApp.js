(function () {
    var Ext = window.Ext4 || window.Ext;

    Ext.define('Rally.apps.milestones.MilestonesApp', {
        extend: 'Rally.app.GridBoardApp',
        requires: [
            'Rally.ui.DateField',
            'Rally.ui.MilestoneTargetProjectPermissionsHelper',
            'Rally.ui.combobox.MilestoneProjectComboBox',
            'Rally.ui.grid.MilestoneProjectEditor'
        ],
        cls: 'milestones-app',
        modelNames: ['Milestone'],
        statePrefix: 'milestone',

        getPermanentFilters: function () {
            return [
                Rally.data.wsapi.Filter.or([
                    { property: 'Projects', operator: 'contains', value: this.getContext().getProjectRef() },
                    { property: 'TargetProject', operator: '=', value: null }
                ])
            ];
        },

        getFieldPickerConfig: function () {
            var config = this.callParent(arguments);
            config.gridFieldBlackList = _.union(config.gridFieldBlackList, [
                'Artifacts',
                'CreationDate',
                'Projects',
                'VersionId'
            ]);
            return _.merge(config, {
                gridAlwaysSelectedValues: ['TargetDate', 'TotalArtifactCount', 'TargetProject']
            });
        },

        getAddNewConfig: function () {
            return Ext.merge(this.callParent(arguments), {
                showRank: false,
                showAddWithDetails: false,
                openEditorAfterAddFailure: false,
                minWidth: 800
            });
        }
    });
})();
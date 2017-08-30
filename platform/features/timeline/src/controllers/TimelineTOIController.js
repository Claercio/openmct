/*****************************************************************************
 * Open MCT, Copyright (c) 2009-2016, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

define([], function () {

    /**
     * Tracks time-of-interest in timelines, updating both scroll state
     * (when appropriate) and positioning of the displayed line.
     */
    function TimelineTOIController(openmct, timerService, $scope) {
        this.timer = timerService.getTimer();

        timerService.on('change', function () {
            this.timer = timerService.getTimer();
        }.bind(this));

        openmct.time.on('tick', function (timestamp) {
            this.timestamp = timestamp;
            // $scope.scroll.x = this.x();
        }.bind(this));

        $scope.$watch('zoomController', function (zoomController) {
            this.zoomController = zoomController;
        }.bind(this));
    }

    TimelineTOIController.prototype.x = function () {
        if (!this.timer || !this.zoomController || isNaN(this.timestamp)) {
            return undefined;
        }

        var timestamp = this.timestamp - this.timer.getModel().timestamp;
        return this.zoomController.toPixels(timestamp);
    };

    TimelineTOIController.prototype.isActive = function () {
        return this.x() !== undefined;
    };

    return TimelineTOIController;
});

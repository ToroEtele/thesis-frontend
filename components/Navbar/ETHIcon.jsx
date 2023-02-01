import React, { useEffect } from 'react'

import { useWeb3Provider } from '../../context/Web3Context';

const ETHIcon = () => {
  const {currentAccount} = useWeb3Provider();

  useEffect(() => {
    var ETHIcon = document.getElementById('eth-icon');
    var context = ETHIcon.getContext('2d');
    context.imageSmoothingQuality = 'high';
    context.scale(2, 2);

    var address = currentAccount;
    var hex_address = address.replace('x', '0');
    if (hex_address.match(/[0-9a-f]{42}/g)) {
        var hex_list = hex_address.match(/(.{1,6})/g);
        var old_point_x = 0;
        var old_point_y = 0;
        for (let hex in hex_list) {
            context.strokeStyle = "#" + hex_list[hex];
            var point_list = hex_list[hex].match(/(.{1,2})/g);
            for (let point in point_list) {
                var char_list = point_list[point].split('');
                var point_x = parseInt(char_list[0], 16);
                var point_y = parseInt(char_list[1], 16);

                for (var i = 0; i < 4; i++) {
                    context.beginPath();
                    context.lineWidth = 1;
                    context.moveTo(old_point_x + 0.5, old_point_y);
                    context.lineTo(old_point_x + 0.5, point_y);
                    context.moveTo(old_point_x, point_y + 0.5);
                    context.lineTo(point_x, point_y + 0.5);
                    context.stroke();

                    context.translate(8, 8);
                    context.rotate(90*Math.PI/180);
                    context.translate(-8, -8);
                }

                old_point_x = point_x;
                old_point_y = point_y;
            }
        }
    }
  }, [currentAccount])

  return (
    <canvas className='ml-5' id="eth-icon" width="32" height="32">
      This text is displayed if your browser does not support HTML5 Canvas.
    </canvas>
  )
}

export default ETHIcon
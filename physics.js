function calculateAccelerations(firstPendulum, secondPendulum, gravityForce) {
    const firstNumerator = -gravityForce * (2 * firstPendulum.mass + secondPendulum.mass) * sin(firstPendulum.angle) -
                           secondPendulum.mass * gravityForce * sin(firstPendulum.angle - 2 * secondPendulum.angle) -
                           2 * sin(firstPendulum.angle - secondPendulum.angle) * secondPendulum.mass *
                           (Math.pow(secondPendulum.vel, 2) * secondPendulum.len +
                            Math.pow(firstPendulum.vel, 2) * firstPendulum.len *
                            cos(firstPendulum.angle - secondPendulum.angle));
    const firstDenominator = firstPendulum.len * (2 * firstPendulum.mass + secondPendulum.mass -
                             secondPendulum.mass * cos(2 * firstPendulum.angle - 2 * secondPendulum.angle));

    const secondNumerator = 2 * sin(firstPendulum.angle - secondPendulum.angle) *
                            (Math.pow(firstPendulum.vel, 2) * firstPendulum.len * (firstPendulum.mass + secondPendulum.mass) +
                             gravityForce * (firstPendulum.mass + secondPendulum.mass) * cos(firstPendulum.angle) +
                             Math.pow(secondPendulum.vel, 2) * secondPendulum.len * secondPendulum.mass *
                             cos(firstPendulum.angle - secondPendulum.angle));
    const secondDenominator = secondPendulum.len * (2 * firstPendulum.mass + secondPendulum.mass - secondPendulum.mass *
                              cos(2 * firstPendulum.angle - 2 * secondPendulum.angle));

    return {
        first: firstNumerator / firstDenominator,
        second: secondNumerator / secondDenominator
    };
}

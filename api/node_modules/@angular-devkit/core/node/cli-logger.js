"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsoleLogger = void 0;
const operators_1 = require("rxjs/operators");
const src_1 = require("../src");
/**
 * A Logger that sends information to STDOUT and STDERR.
 */
function createConsoleLogger(verbose = false, stdout = process.stdout, stderr = process.stderr, colors) {
    const logger = new src_1.logging.IndentLogger('cling');
    logger.pipe((0, operators_1.filter)((entry) => entry.level !== 'debug' || verbose)).subscribe((entry) => {
        const color = colors && colors[entry.level];
        let output = stdout;
        switch (entry.level) {
            case 'warn':
            case 'fatal':
            case 'error':
                output = stderr;
                break;
        }
        // If we do console.log(message) or process.stdout.write(message + '\n'), the process might
        // stop before the whole message is written and the stream is flushed. This happens when
        // streams are asynchronous.
        //
        // NodeJS IO streams are different depending on platform and usage. In POSIX environment,
        // for example, they're asynchronous when writing to a pipe, but synchronous when writing
        // to a TTY. In windows, it's the other way around. You can verify which is which with
        // stream.isTTY and platform, but this is not good enough.
        // In the async case, one should wait for the callback before sending more data or
        // continuing the process. In our case it would be rather hard to do (but not impossible).
        //
        // Instead we take the easy way out and simply chunk the message and call the write
        // function while the buffer drain itself asynchronously. With a smaller chunk size than
        // the buffer, we are mostly certain that it works. In this case, the chunk has been picked
        // as half a page size (4096/2 = 2048), minus some bytes for the color formatting.
        // On POSIX it seems the buffer is 2 pages (8192), but just to be sure (could be different
        // by platform).
        //
        // For more details, see https://nodejs.org/api/process.html#process_a_note_on_process_i_o
        const chunkSize = 2000; // Small chunk.
        let message = entry.message;
        while (message) {
            const chunk = message.slice(0, chunkSize);
            message = message.slice(chunkSize);
            output.write(color ? color(chunk) : chunk);
        }
        output.write('\n');
    });
    return logger;
}
exports.createConsoleLogger = createConsoleLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLWxvZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2NvcmUvbm9kZS9jbGktbG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7OztBQUVILDhDQUF3QztBQUN4QyxnQ0FBaUM7QUFNakM7O0dBRUc7QUFDSCxTQUFnQixtQkFBbUIsQ0FDakMsT0FBTyxHQUFHLEtBQUssRUFDZixTQUF3QixPQUFPLENBQUMsTUFBTSxFQUN0QyxTQUF3QixPQUFPLENBQUMsTUFBTSxFQUN0QyxNQUFpRTtJQUVqRSxNQUFNLE1BQU0sR0FBRyxJQUFJLGFBQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFakQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFBLGtCQUFNLEVBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDckYsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXBCLFFBQVEsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNuQixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxPQUFPO2dCQUNWLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ2hCLE1BQU07U0FDVDtRQUVELDJGQUEyRjtRQUMzRix3RkFBd0Y7UUFDeEYsNEJBQTRCO1FBQzVCLEVBQUU7UUFDRix5RkFBeUY7UUFDekYseUZBQXlGO1FBQ3pGLHNGQUFzRjtRQUN0RiwwREFBMEQ7UUFDMUQsa0ZBQWtGO1FBQ2xGLDBGQUEwRjtRQUMxRixFQUFFO1FBQ0YsbUZBQW1GO1FBQ25GLHdGQUF3RjtRQUN4RiwyRkFBMkY7UUFDM0Ysa0ZBQWtGO1FBQ2xGLDBGQUEwRjtRQUMxRixnQkFBZ0I7UUFDaEIsRUFBRTtRQUNGLDBGQUEwRjtRQUMxRixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxlQUFlO1FBQ3ZDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDNUIsT0FBTyxPQUFPLEVBQUU7WUFDZCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMxQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBbERELGtEQWtEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBsb2dnaW5nIH0gZnJvbSAnLi4vc3JjJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9jZXNzT3V0cHV0IHtcbiAgd3JpdGUoYnVmZmVyOiBzdHJpbmcgfCBCdWZmZXIpOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgTG9nZ2VyIHRoYXQgc2VuZHMgaW5mb3JtYXRpb24gdG8gU1RET1VUIGFuZCBTVERFUlIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb25zb2xlTG9nZ2VyKFxuICB2ZXJib3NlID0gZmFsc2UsXG4gIHN0ZG91dDogUHJvY2Vzc091dHB1dCA9IHByb2Nlc3Muc3Rkb3V0LFxuICBzdGRlcnI6IFByb2Nlc3NPdXRwdXQgPSBwcm9jZXNzLnN0ZGVycixcbiAgY29sb3JzPzogUGFydGlhbDxSZWNvcmQ8bG9nZ2luZy5Mb2dMZXZlbCwgKHM6IHN0cmluZykgPT4gc3RyaW5nPj4sXG4pOiBsb2dnaW5nLkxvZ2dlciB7XG4gIGNvbnN0IGxvZ2dlciA9IG5ldyBsb2dnaW5nLkluZGVudExvZ2dlcignY2xpbmcnKTtcblxuICBsb2dnZXIucGlwZShmaWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5sZXZlbCAhPT0gJ2RlYnVnJyB8fCB2ZXJib3NlKSkuc3Vic2NyaWJlKChlbnRyeSkgPT4ge1xuICAgIGNvbnN0IGNvbG9yID0gY29sb3JzICYmIGNvbG9yc1tlbnRyeS5sZXZlbF07XG4gICAgbGV0IG91dHB1dCA9IHN0ZG91dDtcblxuICAgIHN3aXRjaCAoZW50cnkubGV2ZWwpIHtcbiAgICAgIGNhc2UgJ3dhcm4nOlxuICAgICAgY2FzZSAnZmF0YWwnOlxuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICBvdXRwdXQgPSBzdGRlcnI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIElmIHdlIGRvIGNvbnNvbGUubG9nKG1lc3NhZ2UpIG9yIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG1lc3NhZ2UgKyAnXFxuJyksIHRoZSBwcm9jZXNzIG1pZ2h0XG4gICAgLy8gc3RvcCBiZWZvcmUgdGhlIHdob2xlIG1lc3NhZ2UgaXMgd3JpdHRlbiBhbmQgdGhlIHN0cmVhbSBpcyBmbHVzaGVkLiBUaGlzIGhhcHBlbnMgd2hlblxuICAgIC8vIHN0cmVhbXMgYXJlIGFzeW5jaHJvbm91cy5cbiAgICAvL1xuICAgIC8vIE5vZGVKUyBJTyBzdHJlYW1zIGFyZSBkaWZmZXJlbnQgZGVwZW5kaW5nIG9uIHBsYXRmb3JtIGFuZCB1c2FnZS4gSW4gUE9TSVggZW52aXJvbm1lbnQsXG4gICAgLy8gZm9yIGV4YW1wbGUsIHRoZXkncmUgYXN5bmNocm9ub3VzIHdoZW4gd3JpdGluZyB0byBhIHBpcGUsIGJ1dCBzeW5jaHJvbm91cyB3aGVuIHdyaXRpbmdcbiAgICAvLyB0byBhIFRUWS4gSW4gd2luZG93cywgaXQncyB0aGUgb3RoZXIgd2F5IGFyb3VuZC4gWW91IGNhbiB2ZXJpZnkgd2hpY2ggaXMgd2hpY2ggd2l0aFxuICAgIC8vIHN0cmVhbS5pc1RUWSBhbmQgcGxhdGZvcm0sIGJ1dCB0aGlzIGlzIG5vdCBnb29kIGVub3VnaC5cbiAgICAvLyBJbiB0aGUgYXN5bmMgY2FzZSwgb25lIHNob3VsZCB3YWl0IGZvciB0aGUgY2FsbGJhY2sgYmVmb3JlIHNlbmRpbmcgbW9yZSBkYXRhIG9yXG4gICAgLy8gY29udGludWluZyB0aGUgcHJvY2Vzcy4gSW4gb3VyIGNhc2UgaXQgd291bGQgYmUgcmF0aGVyIGhhcmQgdG8gZG8gKGJ1dCBub3QgaW1wb3NzaWJsZSkuXG4gICAgLy9cbiAgICAvLyBJbnN0ZWFkIHdlIHRha2UgdGhlIGVhc3kgd2F5IG91dCBhbmQgc2ltcGx5IGNodW5rIHRoZSBtZXNzYWdlIGFuZCBjYWxsIHRoZSB3cml0ZVxuICAgIC8vIGZ1bmN0aW9uIHdoaWxlIHRoZSBidWZmZXIgZHJhaW4gaXRzZWxmIGFzeW5jaHJvbm91c2x5LiBXaXRoIGEgc21hbGxlciBjaHVuayBzaXplIHRoYW5cbiAgICAvLyB0aGUgYnVmZmVyLCB3ZSBhcmUgbW9zdGx5IGNlcnRhaW4gdGhhdCBpdCB3b3Jrcy4gSW4gdGhpcyBjYXNlLCB0aGUgY2h1bmsgaGFzIGJlZW4gcGlja2VkXG4gICAgLy8gYXMgaGFsZiBhIHBhZ2Ugc2l6ZSAoNDA5Ni8yID0gMjA0OCksIG1pbnVzIHNvbWUgYnl0ZXMgZm9yIHRoZSBjb2xvciBmb3JtYXR0aW5nLlxuICAgIC8vIE9uIFBPU0lYIGl0IHNlZW1zIHRoZSBidWZmZXIgaXMgMiBwYWdlcyAoODE5MiksIGJ1dCBqdXN0IHRvIGJlIHN1cmUgKGNvdWxkIGJlIGRpZmZlcmVudFxuICAgIC8vIGJ5IHBsYXRmb3JtKS5cbiAgICAvL1xuICAgIC8vIEZvciBtb3JlIGRldGFpbHMsIHNlZSBodHRwczovL25vZGVqcy5vcmcvYXBpL3Byb2Nlc3MuaHRtbCNwcm9jZXNzX2Ffbm90ZV9vbl9wcm9jZXNzX2lfb1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IDIwMDA7IC8vIFNtYWxsIGNodW5rLlxuICAgIGxldCBtZXNzYWdlID0gZW50cnkubWVzc2FnZTtcbiAgICB3aGlsZSAobWVzc2FnZSkge1xuICAgICAgY29uc3QgY2h1bmsgPSBtZXNzYWdlLnNsaWNlKDAsIGNodW5rU2l6ZSk7XG4gICAgICBtZXNzYWdlID0gbWVzc2FnZS5zbGljZShjaHVua1NpemUpO1xuICAgICAgb3V0cHV0LndyaXRlKGNvbG9yID8gY29sb3IoY2h1bmspIDogY2h1bmspO1xuICAgIH1cbiAgICBvdXRwdXQud3JpdGUoJ1xcbicpO1xuICB9KTtcblxuICByZXR1cm4gbG9nZ2VyO1xufVxuIl19
import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { NonFile } from './non-file';

@Injectable()
export class AppService {
  getReadStream(): StreamableFile {
    return new StreamableFile(
      createReadStream(join(process.cwd(), 'Readme.md')),
    );
  }

  getBuffer(): StreamableFile {
    return new StreamableFile(readFileSync(join(process.cwd(), 'Readme.md')));
  }

  getNonFile(): NonFile {
    return new NonFile('Hello world');
  }

  getRxJSFile(): Observable<StreamableFile> {
    return of(this.getReadStream());
  }

  getFileWithHeaders(): StreamableFile {
    const file = readFileSync(join(process.cwd(), 'Readme.md'));
    return new StreamableFile(
      createReadStream(join(process.cwd(), 'Readme.md')),
      {
        type: 'text/markdown',
        disposition: 'attachment; filename="Readme.md"',
        length: file.byteLength,
      },
    );
  }

  getFileThatDoesNotExist(): StreamableFile {
    return new StreamableFile(createReadStream('does-not-exist.txt'));
  }
}

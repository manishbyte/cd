# Compiler Design Laboratory Manual — Ubuntu Dark Wikipedia Portal

An encyclopedic, Wikipedia-style reference compendium for Compiler Design (CD) laboratory practicals, featuring a dark theme styled with canonical **Ubuntu Operating System colors** (Ubuntu Aubergine, Ubuntu Terminal Dark, and Ubuntu Orange).

---

## Practicals Included

1. **Practical 1: Lexical Analyzer using LEX to Identify C Tokens**
   - Tokenizes C code into headers, data types, identifiers, control keywords, relational/logical operators, comments, and delimiters.
   - Files: `a.l`, `input.c`
2. **Practical 2: Lexical Analyzer to Identify Numbers**
   - Unambiguous classification of Binary (`0b`), Hexadecimal (`0x`), Octal (`0`), Scientific Exponent (`12e5`), Signed Floats, and Integers.
   - Files: `program2.l`, `input.txt`
3. **Practical 3: Calculator using LEX and YACC**
   - LALR(1) arithmetic evaluator with precedence, parentheses, unary minus (`-5+3`), and zero-division / modulo exception trapping.
   - Files: `calculator.l`, `calculator.y`
4. **Practical 4: Context Free Grammar (0ⁿ1ⁿ | n &ge; 1)**
   - Pushdown Automaton grammar parsing balanced strings of equal 0s and 1s using Bison and Flex.
   - Files: `cfg.l`, `cfg.y`
5. **Practical 5: Target Code Generator for Intel 8086 Assembly**
   - Converts arithmetic assignments into syntactically valid Intel 8086 assembly instructions (`MOV`, `ADD`, `SUB`, `MUL BX`, `DIV BX`).
   - Files: `exp.l`, `exp.y`, `input.txt`
6. **Practical 6: DFA for Decimal Divisibility by 3**
   - 3-state Deterministic Finite Automaton modeling modulo 3 residue transitions on streaming decimal digits.
   - Files: `dfa.l`, `dfa.y`

---

## Repository Files

- `index.html` &mdash; Central Wikipedia-style portal, summary matrix, quick command summary, and diagnostics.
- `practical1.html` &mdash; Practical 1 manual page.
- `practical2.html` &mdash; Practical 2 manual page.
- `practical3.html` &mdash; Practical 3 manual page.
- `practical4.html` &mdash; Practical 4 manual page.
- `practical5.html` &mdash; Practical 5 manual page.
- `practical6.html` &mdash; Practical 6 manual page.
- `style.css` &mdash; Ubuntu Dark + Wikipedia CSS stylesheet (Aubergine `#2C001E`, Terminal `#300A24`, Orange `#E95420`).
- `script.js` &mdash; Active navigation highlighting and copy-to-clipboard functionality.
- `Dockerfile` &mdash; Production-ready, lightweight Nginx Alpine container image with health check.
- `.dockerignore` &mdash; Excludes VCS and repository documentation from the Docker build context.

---

## Docker Quickstart

### 1. Build the Docker Image
```bash
docker build -t cd-practicals-portal .
```

### 2. Run the Container
```bash
docker run -d --name cd-manual -p 80:80 --restart always cd-practicals-portal
```

### 3. Open in Browser
Visit `http://localhost/` (or your server's public IP).

---

## Deploying on AWS EC2 (Ubuntu 24.04 LTS / Amazon Linux 2023)

### Step 1: Launch EC2 Instance & Open Port 80
- Ensure **Port 80 (HTTP)** and **Port 22 (SSH)** are open in your Security Group rules.

### Step 2: Connect via SSH
```bash
ssh -i "your-key.pem" ubuntu@<your-ec2-ip>
```

### Step 3: Install Docker
```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
newgrp docker
```

### Step 4: Transfer Website Files
```bash
scp -i "your-key.pem" -r ./* ubuntu@<your-ec2-ip>:~/cd-practicals/
```

### Step 5: Build & Run Container
```bash
cd ~/cd-practicals
docker build -t cd-manual .
docker run -d --name cd-manual-app -p 80:80 --restart always cd-manual
```

The portal will be live at `http://<your-ec2-ip>/`.
